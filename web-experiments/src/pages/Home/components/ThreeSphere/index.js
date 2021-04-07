import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Scene, PerspectiveCamera, Color, PointLight,
  WebGLRenderer, Group, MeshBasicMaterial, WebGLRenderTarget,
  CylinderGeometry, Matrix4, ShaderMaterial, Vector3, Mesh,
  TextureLoader, NearestFilter, Vector2, DepthTexture,
  UnsignedShortType, Clock,
} from 'three';
import {
  GLTFLoader,
} from 'three/examples/jsm/loaders/GLTFLoader';
import {
  EffectComposer,
} from 'three/examples/jsm/postprocessing/EffectComposer';
import {
  RenderPass,
} from 'three/examples/jsm/postprocessing/RenderPass';
import {
  ShaderPass,
} from 'three/examples/jsm/postprocessing/ShaderPass';
import fontFile from '../../../../web/assets/objects/font2.png';
import modelFile from '../../../../web/assets/objects/skullcrane.glb';
import AsciiShader from './shaders/AsciiShader';
import VolumetricLightCylinder from './shaders/VolumetricLightCylinder';
import VolumetricLightScattering from './shaders/VolumetricLightScattering';

class ThreeSphere extends PureComponent {
  constructor (props) {
    super(props);

    this.init = this.init.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.resizeRenderer = this.resizeRenderer.bind(this);
    this.stop = this.stop.bind(this);
    this.getLowResSize = this.getLowResSize.bind(this);
    this.updateAsciiRenderSize = this.updateAsciiRenderSize.bind(this);
    this.mousemove = this.mousemove.bind(this);

    this.container = null;
    this.backLight = null;
    this.ambientLight = null;
    this.mainScene = null;
    this.mainCamera = null;
    this.occlusionCamera = null;
    this.fillLight = null;
    this.keyLight = null;
    this.renderer = null;
    this.loader = null;
    this.modelContainer = null;
    this.clock = null;
    this.requestId = null;
    this.fontMapSize = null;
    this.fontCharSize = null;
    this.finalComposer = null;
    this.asciiPass = null;
    this.lowResRenderTarget = null;

    this.lightConeTarget = null;
    this.lightCone = null;
    this.lightCylinderMaterial = null;
    this.lightScatteringPass = null;
    this.occlusionRenderTarget = null;
    this.occlusionComposer = null;

    this.DEFAULT_LAYER = 0;
    this.OCCLUSION_LAYER = 1;
  }

  componentDidMount () {
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeRenderer);
    this.container.removeChild(this.renderer.domElement);
    this.stop();

    this.loader = null;
    this.scene = null;
    this.camera = null;
    this.composer = null;
    this.renderer = null;
  }

  // Create Scene + Camera
  init () {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.mainScene = new Scene();

    this.mainCamera = new PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.1,
      12,
    );
    this.mainCamera.position.z = 10;
    this.mainCamera.position.x = 1.3;
    this.mainCamera.position.y = 0.5;

    this.occlusionCamera = this.mainCamera.clone();
    this.occlusionCamera.layers.set(this.OCCLUSION_LAYER);

    this.mainScene.background = new Color(0xffc99b);

    // Add Point Lights
    this.backLight = new PointLight(0xdbc0b3, 3, 20);
    this.backLight.layers.enable(this.OCCLUSION_LAYER);
    this.backLight.position.set(-5, 5, 3);
    this.mainScene.add(this.backLight);

    this.fillLight = new PointLight(0xe0b8c7, 0.7, 20);
    this.fillLight.layers.enable(this.OCCLUSION_LAYER);
    this.fillLight.position.set(5, 0, 5);
    this.mainScene.add(this.fillLight);

    this.keyLight = new PointLight(0xc29999, 2, 20);
    this.keyLight.layers.enable(this.OCCLUSION_LAYER);
    this.keyLight.position.set(5, 0, 0);
    this.mainScene.add(this.keyLight);

    // Create Renderer
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    // Load 3D Model
    this.loader = new GLTFLoader();
    this.modelContainer = new Group();
    this.modelContainer.layers.enable(this.OCCLUSION_LAYER);

    this.mainScene.add(this.modelContainer);

    this.loader.load(
      modelFile,
      (gltf) => {
        this.modelContainer.add(gltf.scene);

        // Add black mesh set to occlusion Layer
        const occlusionScene = gltf.scene.clone();
        const blackMaterial = new MeshBasicMaterial({
          color: new Color(0x000000),
        });
        occlusionScene.traverse((node) => {
          if (node.material) {
            node.material = blackMaterial;
          }
          if (node.layers) {
            node.layers.set(this.OCCLUSION_LAYER);
          }
        });
        this.modelContainer.add(occlusionScene);
      },
      undefined,
      () => {},
    );

    // Volumetric Lighting
    this.occlusionRenderTarget = new WebGLRenderTarget(
      window.innerWidth * 0.5,
      window.innerHeight * 0.5,
    );

    this.occlusionComposer = new EffectComposer(this.renderer, this.occlusionRenderTarget);
    this.occlusionComposer.renderToScreen = false;
    this.occlusionComposer.addPass(new RenderPass(this.mainScene, this.occlusionCamera));

    this.lightScatteringPass = new ShaderPass(VolumetricLightScattering());
    this.lightScatteringPass.needsSwap = false;
    this.occlusionComposer.addPass(this.lightScatteringPass);

    const lightGeometry = new CylinderGeometry(3, 6, 15, 32, 6, true);
    lightGeometry.applyMatrix4(
      new Matrix4().makeTranslation(
        0,
        -lightGeometry.parameters.height / 2,
        0,
      ),
    );
    lightGeometry.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2));

    this.lightCylinderMaterial = new ShaderMaterial(
      VolumetricLightCylinder(),
    );
    this.lightConeTarget = new Vector3(0, 0, -8);
    this.lightCone = new Mesh(lightGeometry, this.lightCylinderMaterial);
    this.lightCone.position.set(-5, 5, -8);
    this.lightCone.layers.set(this.OCCLUSION_LAYER);
    this.lightCylinderMaterial.uniforms.spotPosition.value = this.lightCone.position;
    this.mainScene.add(this.lightCone);

    // Load font texture for render pass
    const fontLoader = new TextureLoader();
    const tFont = fontLoader.load(fontFile);
    tFont.minFilter = NearestFilter;
    tFont.magFilter = NearestFilter;

    // Calculate render target and setup first pass
    this.fontMapSize = new Vector2(64, 64);
    this.fontCharSize = new Vector2(8, 8);
    const startingSizeData = this.getLowResSize();

    // Should match whatever was set in updateAsciiRenderSize
    this.lowResRenderTarget = new WebGLRenderTarget(
      startingSizeData.charCountCeil[0] * 2,
      startingSizeData.charCountCeil[1] * 2,
    );

    const lowResDepthTexture = new DepthTexture();
    lowResDepthTexture.type = UnsignedShortType;
    this.lowResRenderTarget.depthTexture = lowResDepthTexture;

    this.finalComposer = new EffectComposer(this.renderer);

    this.asciiPass = new ShaderPass(AsciiShader());
    this.asciiPass.uniforms.tLowRes.value = this.lowResRenderTarget.texture;
    this.asciiPass.uniforms.tDepth.value = lowResDepthTexture;
    this.asciiPass.uniforms.cameraNear.value = this.mainCamera.near;
    this.asciiPass.uniforms.cameraFar.value = this.mainCamera.far;
    this.asciiPass.uniforms.tFont.value = tFont;

    // Precalculate render values
    const fontCountX = this.fontMapSize.x / this.fontCharSize.x;
    const fontCountY = this.fontMapSize.y / this.fontCharSize.y;

    this.asciiPass.uniforms.fontCharTotalCount.value =
      Math.floor(fontCountX) * Math.floor(fontCountY);
    this.asciiPass.uniforms.fontCharSize.value.set(1 / fontCountX, 1 / fontCountY);
    this.asciiPass.uniforms.fontCharCount.value.set(fontCountX, fontCountY);
    this.updateAsciiRenderSize();

    this.finalComposer.addPass(this.asciiPass);

    // Add color pass to 'wash out' the image
    const colorShader = {
      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        void main() {
          vec4 previousPassColor = texture2D(tDiffuse, vUv);
          gl_FragColor = vec4(
              previousPassColor.rgb + color,
              previousPassColor.a);
        }
      `,
      uniforms: {
        color: {value: new Color(0xcbc7d1)},
        tDiffuse: {value: null},
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
        }
      `,
    };

    const colorPass = new ShaderPass(colorShader);
    colorPass.renderToScreen = true;
    this.finalComposer.addPass(colorPass);

    this.clock = new Clock();
    this.modelContainer.rotation.x = 0.5;
    this.modelContainer.rotation.y = 5.7;

    window.addEventListener('mousemove', this.mousemove);
    window.addEventListener('resize', this.resizeRenderer);

    this.props.hideLoader();
    this.renderScene();
  }

  mousemove (event) {
    if (this.lightCone) {
      this.lightCone.position.x = 5 * (event.clientX / window.innerWidth * 2 - 1);
      this.backLight.position.x = this.lightCone.position.x;
    }
    this.modelContainer.rotation.x = 0.5 + 0.0001 * event.clientX;
    this.modelContainer.rotation.y = 5.7 + 0.0001 * event.clientY;
  }

  updateAsciiRenderSize () {
    const size = this.getLowResSize();

    this.asciiPass.uniforms.renderCharSize.value.set(
      1 / size.charCountPrecise[0],
      1 / size.charCountPrecise[1],
    );

    this.asciiPass.uniforms.renderCharCount.value.set(
      size.charCountPrecise[0],
      size.charCountPrecise[1],
    );

    // This affects the level of detail. The higher the ratio is
    // (times mutliplier) the bigger each render block will be, and
    // the sharper the shape / less detailed each block will be.
    this.lowResRenderTarget.setSize(
      size.charCountCeil[0] * 5,
      size.charCountCeil[1] * 5,
    );
  }

  getLowResSize () {
    const charCountPrecise = [
      window.innerWidth / this.fontCharSize.x,
      window.innerHeight / this.fontCharSize.y,
    ];

    const charCountCeil = charCountPrecise.map(Math.ceil);

    return {
      charCountCeil,
      charCountPrecise,
    };
  }

  // Handle Window Resize
  resizeRenderer () {
    this.mainCamera.aspect = window.innerWidth / window.innerHeight;
    this.mainCamera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Render Scene
  renderScene () {
    this.lightCone.lookAt(this.lightConeTarget);
    this.lightCylinderMaterial.uniforms.spotPosition.value = this.lightCone.position;
    const lightConePosition = this.lightCone.position.clone();
    const vector = lightConePosition.project(this.occlusionCamera);
    this.lightScatteringPass.uniforms.lightPosition.value.set(
      (vector.x + 1) / 2,
      (vector.y + 1) / 2,
    );

    this.renderer.setRenderTarget(this.occlusionRenderTarget);
    this.renderer.setRenderTarget(null);

    this.renderer.setRenderTarget(this.lowResRenderTarget);
    this.renderer.render(this.mainScene, this.mainCamera);
    this.renderer.setRenderTarget(null);

    this.finalComposer.render();
    this.requestId = requestAnimationFrame(this.renderScene);
  }

  stop () {
    cancelAnimationFrame(this.requestId);
    this.requestId = undefined;
  }

  render () {
    return (
      <div ref={(ref) => {
        this.mount = ref;
      }} />
    );
  }
}

ThreeSphere.propTypes = {
  hideLoader: PropTypes.func.isRequired,
};

export default ThreeSphere;
