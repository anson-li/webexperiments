import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import modelFile from '../../../../../web/assets/objects/donutthree.glb';

class ThreeJS extends PureComponent {

  constructor(props) {
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

  componentDidMount() {
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  componentWillUnmount() {
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
  init() {

    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.mainScene = new THREE.Scene()

    this.mainCamera = new THREE.PerspectiveCamera(
      20, // camera frustrum field of view
      window.innerWidth / window.innerHeight, // camera aspect ratio
      0.1, // near plane, or the minimum range to start rendering. If it's too high, stuff that's too close will be missed.
      12 // far plane, or the maximum range to render. Important to note it's affecting your render quality too.
    )
    this.mainCamera.position.z = 1.1; // zooms out to capture detail - everything is x10 size to capture detail
    this.mainCamera.position.x = 0.1; // shifts the camera more towards the middle of the frame
    // this.mainCamera.position.y = 0.5; // moves the camera slightly higher

    // Add Point Lights
    this.backLight = new THREE.PointLight(0xFFFFFF, 3, 20);
    this.backLight.position.set(-5, 5, 3);
    this.mainScene.add(this.backLight);
  
    this.fillLight = new THREE.PointLight(0xFFFFFF, 0.7, 20);
    this.fillLight.position.set(5, 0, 5);
    this.mainScene.add(this.fillLight);
  
    this.keyLight = new THREE.PointLight(0xFFFFFF, 2, 20);
    this.keyLight.position.set(5, 0, 0);
    this.mainScene.add(this.keyLight);

    // Create Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    // Load 3D Model
    this.loader = new GLTFLoader();  
    this.modelContainer = new THREE.Group();

    this.mainScene.add(this.modelContainer);
  
    this.loader.load(
      modelFile,
      gltf => {
        this.modelContainer.add(gltf.scene);
        this.mixer = new THREE.AnimationMixer(gltf.scene);
        this.action = this.mixer.clipAction( gltf.animations[ 0 ] );
        this.action.play();
      },
      undefined,
      console.error
    );

    this.finalComposer = new EffectComposer(this.renderer);
    this.finalComposer.addPass(new RenderPass(this.mainScene, this.mainCamera));

    this.clock = new THREE.Clock();
    this.modelContainer.rotation.x = Math.PI / 16;
    this.modelContainer.rotation.y = -Math.PI / 2;

    // window.addEventListener("mousemove", this.mousemove);
    window.addEventListener("resize", this.resizeRenderer);

    this.renderScene();
    this.props.hideLoader();
  }

  mousemove(e) {
    if (this.lightCone) {
      this.lightCone.position.x = 5 * ((e.clientX / window.innerWidth) * 2 - 1);
      this.backLight.position.x = this.lightCone.position.x;
    }
    this.modelContainer.rotation.x = Math.PI / 16 + 0.0001 * e.clientX;
    this.modelContainer.rotation.y = -Math.PI / 2 + 0.0001 * e.clientY;
  }


  // Handle Window Resize
  resizeRenderer() {
    this.mainCamera.aspect = window.innerWidth / window.innerHeight;
    this.mainCamera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

  }

  // Render Scene
  renderScene() {
    var delta = this.clock.getDelta();
    if ( this.mixer ) this.mixer.update( delta );

    this.renderer.render(this.mainScene, this.mainCamera);
    this.finalComposer.render();
    this.requestId = requestAnimationFrame(this.renderScene);
  }
  
  stop() {
    this.action.stop();
    cancelAnimationFrame(this.requestId);
    this.requestId = undefined;
  }

  render() {
    return (
      <div ref={(ref) => { this.mount = ref; }} />
    );
  }
}

ThreeJS.propTypes = {
  hideLoader: PropTypes.func.isRequired,
};

export default ThreeJS;
