import React, {
  PureComponent,
} from 'react';
import {
  Scene, PerspectiveCamera, PointLight, WebGLRenderer, Group, AnimationMixer, Clock,
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
import modelFile from '../../../../../web/assets/objects/donutthree.glb';

class ImageParticles extends PureComponent {
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

    this.mixer = null;
    this.action = null;
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

    this.modelContainer = null;
    this.mixer = null;
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
    this.mainCamera.position.z = 1.1;
    this.mainCamera.position.x = 0.1;

    // Add Point Lights
    this.backLight = new PointLight(0xFFFFFF, 3, 20);
    this.backLight.position.set(-5, 5, 3);
    this.mainScene.add(this.backLight);

    this.fillLight = new PointLight(0xFFFFFF, 0.7, 20);
    this.fillLight.position.set(5, 0, 5);
    this.mainScene.add(this.fillLight);

    this.keyLight = new PointLight(0xFFFFFF, 2, 20);
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
        this.mixer = new AnimationMixer(gltf.scene);
        this.action = this.mixer.clipAction(gltf.animations[0]);
        this.action.play();
      },
      undefined,
      () => {},
    );

    this.finalComposer = new EffectComposer(this.renderer);
    this.finalComposer.addPass(new RenderPass(this.mainScene, this.mainCamera));

    this.clock = new Clock();
    this.modelContainer.rotation.x = Math.PI / 16;
    this.modelContainer.rotation.y = -Math.PI / 2;

    // window.addEventListener("mousemove", this.mousemove);
    window.addEventListener('resize', this.resizeRenderer);

    this.renderScene();
  }

  mousemove (event) {
    if (this.lightCone) {
      this.lightCone.position.x = 5 * (event.clientX / window.innerWidth * 2 - 1);
      this.backLight.position.x = this.lightCone.position.x;
    }
    this.modelContainer.rotation.x = Math.PI / 16 + 0.0001 * event.clientX;
    this.modelContainer.rotation.y = -Math.PI / 2 + 0.0001 * event.clientY;
  }

  // Handle Window Resize
  resizeRenderer () {
    this.mainCamera.aspect = window.innerWidth / window.innerHeight;
    this.mainCamera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Render Scene
  renderScene () {
    const delta = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(delta);
    }

    this.renderer.render(this.mainScene, this.mainCamera);
    this.finalComposer.render();
    this.requestId = requestAnimationFrame(this.renderScene);
  }

  stop () {
    this.action.stop();
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

export default ImageParticles;
