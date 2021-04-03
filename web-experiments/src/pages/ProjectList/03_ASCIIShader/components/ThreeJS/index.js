import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Scene, PerspectiveCamera, Color, PointLight, WebGLRenderer, Group, TextureLoader, NearestFilter, Vector2, WebGLRenderTarget, DepthTexture, UnsignedShortType, Clock,
} from 'three';
import {
  GLTFLoader,
} from 'three/examples/jsm/loaders/GLTFLoader';
import {
  EffectComposer,
} from 'three/examples/jsm/postprocessing/EffectComposer';
import {
  ShaderPass,
} from 'three/examples/jsm/postprocessing/ShaderPass';
import fontFile from '../../../../../web/assets/objects/font2.png';
import modelFile from '../../../../../web/assets/objects/skullcrane.glb';
import ASCIIShader from './shaders/ASCII';

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
      20, // camera frustrum field of view
      window.innerWidth / window.innerHeight, // camera aspect ratio
      0.1, // near plane, or the minimum range to start rendering. If it's too high, stuff that's too close will be missed.
      12, // far plane, or the maximum range to render. Important to note it's affecting your render quality too.
    );
    this.mainCamera.position.z = 10; // zooms out to capture detail - everything is x10 size to capture detail
    this.mainCamera.position.x = 1.3; // shifts the camera more towards the middle of the frame
    this.mainCamera.position.y = 0.5; // moves the camera slightly higher

    this.mainScene.background = new Color(0xffffff);

    // Add Point Lights
    this.backLight = new PointLight(0xff0000, 3, 20);
    this.backLight.position.set(-5, 5, 0);
    this.mainScene.add(this.backLight);

    this.fillLight = new PointLight(0x00ff00, 1.5, 20);
    this.fillLight.position.set(0, 5, 5);
    this.mainScene.add(this.fillLight);

    this.keyLight = new PointLight(0x0000ff, 2, 20);
    this.keyLight.position.set(5, 0, 3);
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
      },
      undefined,
      console.error,
    );

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

    this.asciiPass = new ShaderPass(ASCIIShader());
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

    this.clock = new Clock();
    this.modelContainer.rotation.x = 0.5;
    this.modelContainer.rotation.y = 5.7;

    window.addEventListener('mousemove', this.mousemove);
    window.addEventListener('resize', this.resizeRenderer);

    this.renderScene();
  }

  mousemove (e) {
    this.modelContainer.rotation.x = 0.5 + 0.0001 * e.clientX;
    this.modelContainer.rotation.y = 5.7 + 0.0001 * e.clientY;
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

    // this.occlusionCamera.aspect = this.mainCamera.aspect;
    // this.occlusionCamera.updateProjectionMatrix();
    // this.occlusionComposer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
  }

  // Render Scene
  renderScene () {
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
