import {
  GUI,
} from 'dat.gui';
import React, {
  PureComponent,
} from 'react';
import {
  Scene, PerspectiveCamera, PointLight, WebGLRenderer, Group, Color, Clock,
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
import modelFile from '../../../../../web/assets/objects/skullcrane.glb';

class ThreeJS extends PureComponent {
  constructor (props) {
    super(props);

    this.init = this.init.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.resizeRenderer = this.resizeRenderer.bind(this);
    this.stop = this.stop.bind(this);
    this.mousemove = this.mousemove.bind(this);

    this.container = null;
    this.backLight = null;
    this.ambientLight = null;
    this.mainScene = null;
    this.mainCamera = null;
    this.fillLight = null;
    this.keyLight = null;
    this.renderer = null;
    this.loader = null;
    this.modelContainer = null;
    this.clock = null;
    this.requestId = null;
    this.finalComposer = null;

    this.gui = null;
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
    this.gui.destroy();
  }

  // Create Scene + Camera
  init () {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.mainScene = new Scene();

    // PerspectiveCamera documentation:
    // camera frustrum field of view
    // camera aspect ratio
    // near plane, or the minimum range to start rendering. If it's too high, stuff that's too close will be missed.
    // far plane, or the maximum range to render. Important to note it's affecting your render quality too.

    this.mainCamera = new PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.1,
      12,
    );

    // MainCamera Position documentation:
    // z: zooms out to capture detail - everything is x10 size to capture detail
    // x: shifts the camera more towards the middle of the frame
    // y: moves the camera slightly higher

    this.mainCamera.position.z = 10;
    this.mainCamera.position.x = 1.3;
    this.mainCamera.position.y = 0.5;

    // Add Point Lights
    this.backLight = new PointLight(0xdbc0b3, 3, 20);
    this.backLight.position.set(-5, 5, 3);
    this.mainScene.add(this.backLight);

    this.fillLight = new PointLight(0xe0b8c7, 0.7, 20);
    this.fillLight.position.set(5, 0, 5);
    this.mainScene.add(this.fillLight);

    this.keyLight = new PointLight(0xc29999, 2, 20);
    this.keyLight.position.set(5, 0, 0);
    this.mainScene.add(this.keyLight);

    // Create Renderer
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.devicePixelRatio > 1) {
      this.renderer.setPixelRatio(window.devicePixelRatio);
    }
    this.container.appendChild(this.renderer.domElement);

    // Load 3D Model
    this.loader = new GLTFLoader();
    this.modelContainer = new Group();

    this.mainScene.add(this.modelContainer);

    this.loader.load(
      modelFile,
      (gltf) => {
        this.modelContainer.add(gltf.scene);
      },
      undefined,
      () => {},
    );

    this.finalComposer = new EffectComposer(this.renderer);

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
        color: {value: new Color(0xb06fb2)},
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

    this.finalComposer.addPass(new RenderPass(this.mainScene, this.mainCamera));
    this.finalComposer.addPass(colorPass);

    this.clock = new Clock();
    this.modelContainer.rotation.x = 0.5;
    this.modelContainer.rotation.y = 5.7;

    this.gui = new GUI();
    const conf = {color: '#b06fb2'};
    this.gui.addColor(conf, 'color').onChange((colorValue) => {
      colorPass.uniforms.color.value.set(colorValue);
    });

    window.addEventListener('mousemove', this.mousemove);
    window.addEventListener('resize', this.resizeRenderer);

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

  // Handle Window Resize
  resizeRenderer () {
    this.mainCamera.aspect = window.innerWidth / window.innerHeight;
    this.mainCamera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Render Scene
  renderScene () {
    this.renderer.render(this.mainScene, this.mainCamera);
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

export default ThreeJS;
