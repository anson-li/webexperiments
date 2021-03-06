import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import debounce from 'lodash.debounce';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelFile from '../../../../web/assets/objects/donutthree.glb';

class ThreeSphere extends PureComponent {
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.resizeRenderer = this.resizeRenderer.bind(this);

    this.container = null;
    this.backLight = null;
    this.mainScene = null;
    this.mainCamera = null;
    this.fillLight = null;
    this.keyLight = null;
    this.renderer = null;
    this.loader = null;
    this.modelContainer = null;
    this.clock = null;
    this.requestId = null;
  }

  componentDidMount() {
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    this.container.removeChild(this.renderer.domElement);

    this.loader = null;
    this.scene = null;
    this.camera = null;
    this.composer = null;
    this.renderer = null;
  }

  // Create Scene + Camera
  init() {
    console.log(modelFile);

    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.mainScene = new THREE.Scene()

    this.mainCamera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.1,
      20
    )
    this.mainCamera.position.z = 10;
  
    // Add Point Lights
    this.backLight = new THREE.PointLight(0x00aaff, 3, 20);
    this.backLight.position.set(-5, 5, -5);
    this.mainScene.add(this.backLight);
  
    this.fillLight = new THREE.PointLight(0x00aaff, 0.7, 20);
    this.fillLight.position.set(-5, 0, 5);
    this.mainScene.add(this.fillLight);
  
    this.keyLight = new THREE.PointLight(0xff00ff, 2, 20);
    this.keyLight.position.set(5, 0, 0);
    this.mainScene.add(this.keyLight);
  
    // Create Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('app').appendChild(this.renderer.domElement);
  
    // Load 3D Model
    this.loader = new GLTFLoader();  
    this.modelContainer = new THREE.Group();
    this.mainScene.add(this.modelContainer);
  
    this.loader.load(
      modelFile,
      gltf => {
        this.modelContainer.add(gltf.scene)
      },
      undefined,
      console.error
    );
    this.clock = new THREE.Clock();
    window.addEventListener('resize', debounce(this.resizeRenderer, 50));
    this.renderScene();
  }

  // Handle Window Resize
  resizeRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mainCamera.aspect = window.innerWidth / window.innerHeight;
    this.mainCamera.updateProjectionMatrix();
  }

  // Render Scene
  renderScene() {
    const delta = this.clock.getDelta();
    this.modelContainer.rotation.x += delta * 0.5;
    this.modelContainer.rotation.y += delta * 0.5;
    this.renderer.render(this.mainScene, this.mainCamera);
    this.requestId = requestAnimationFrame(this.renderScene);
  }

  render() {
    return (
      <div ref={(ref) => { this.mount = ref; }} />
    );
  }
}

ThreeSphere.propTypes = {
  hideLoader: PropTypes.func.isRequired,
};

export default ThreeSphere;
