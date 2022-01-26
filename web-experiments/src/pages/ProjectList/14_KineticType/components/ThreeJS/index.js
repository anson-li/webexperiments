import loadFont from 'load-bmfont';
import React, {
  PureComponent,
} from 'react';
import {
  Scene, PerspectiveCamera, WebGLRenderTarget, Color, TextureLoader,
  RawShaderMaterial, DoubleSide, Mesh,
  WebGL1Renderer, Clock, TorusKnotGeometry, ShaderMaterial,
} from 'three';
import createGeometry from 'three-bmfont-text';
import MSDFShader from 'three-bmfont-text/shaders/msdf';
import {
  OrbitControls,
} from 'three/examples/jsm/controls/OrbitControls';
import fontFile from '../assets/Orbulon-Black.fnt';
import fontAtlas from '../assets/Orbulon-Black.png';
import {
  fragmentShader, vertexShader,
} from './shader';

class ThreeJS extends PureComponent {
  // Reference: https://tympanus.net/codrops/2020/06/02/kinetic-typography-with-three-js/

  constructor (props) {
    super(props);

    this.init = this.init.bind(this);
    this.createRenderTarget = this.createRenderTarget.bind(this);
    this.createMesh = this.createMesh.bind(this);
    this.animate = this.animate.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.resize = this.resize.bind(this);
    this.renderAnimation = this.renderAnimation.bind(this);

    this.renderer = new WebGL1Renderer({
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 1);

    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );

    this.camera.position.z = 60;
    this.scene = new Scene();
    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.update();
    // this.controls.autoRotate = true;
    this.clock = new Clock();
  }

  componentDidMount () {
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  // Create Scene + Camera
  init () {
    // Create geometry of packed glyphs
    loadFont(fontFile, (_err, font) => {
      this.fontGeometry = createGeometry({
        font,
        text: 'ENDLESS',
      });

      // Load texture containing font glyps
      this.loader = new TextureLoader();
      this.loader.load(fontAtlas, (texture) => {
        this.fontMaterial = new RawShaderMaterial(
          MSDFShader({
            color: 0xffffff,
            map: texture,
            negate: false,
            side: DoubleSide,
            transparent: true,
          }),
        );

        this.createRenderTarget();
        this.createMesh();
        this.animate();
        this.addEvents();
      });
    });
  }

  createRenderTarget () {
    // Render Target setup
    this.rt = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
    );
    this.rtCamera = new PerspectiveCamera(45, 1, 0.1, 1000);
    this.rtCamera.position.z = 2.5;

    this.rtScene = new Scene();
    this.rtScene.background = new Color('#000000');

    // Create text mesh with font geometry and material
    this.text = new Mesh(this.fontGeometry, this.fontMaterial);

    // Adjust dimensions
    this.text.position.set(-0.965, -0.275, 0);
    this.text.rotation.set(Math.PI, 0, 0);
    this.text.scale.set(0.008, 0.02, 1);

    // Add text mesh to buffer scene
    this.rtScene.add(this.text);
  }

  createMesh () {
    this.geometry = new TorusKnotGeometry(9, 3, 768, 3, 4, 3);
    this.material = new ShaderMaterial({
      fragmentShader,
      uniforms: {
        uTexture: {value: this.rt.texture},
        uTime: {value: 0},
      },
      vertexShader,
    });

    this.mesh = new Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  animate () {
    requestAnimationFrame(this.animate.bind(this));
    this.renderAnimation();
  }

  addEvents () {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize () {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  renderAnimation () {
    this.controls.update();
    // this.mesh.rotation.y += 0.005;

    // Update time
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();

    // Draw Render Target
    this.renderer.setRenderTarget(this.rt);
    this.renderer.render(this.rtScene, this.rtCamera);
    this.renderer.setRenderTarget(null);

    this.renderer.render(this.scene, this.camera);
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
