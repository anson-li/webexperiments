import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class ThreeSphere extends PureComponent {
  constructor(props) {
    super(props);

    this.mouseX = 0;
    this.mouseY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera = null;
    this.scene = null;
    this.container = null;
    this.particle = null;
    this.renderer = null;
    this.geometry = null;
    this.material = null;
    this.requestId = null;
    this.particles = [];
    this.xDirection = true;
    this.yDirection = false;

    this.onWindowResize = this.onWindowResize.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.onDocumentTouchStart = this.onDocumentTouchStart.bind(this);
    this.onDocumentTouchMove = this.onDocumentTouchMove.bind(this);

    this.init = this.init.bind(this);
    this.animate = this.animate.bind(this);
    this.animateFrame = this.animateFrame.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    this.container.removeChild(this.renderer.domElement);
    this.stop();

    this.loader = null;
    this.scene = null;
    this.camera = null;
    this.composer = null;
    this.renderer = null;
  }

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onDocumentMouseMove(event) {
    this.mouseX = (event.clientX - this.windowHalfX) / 2;
    this.mouseY = (event.clientY - this.windowHalfY) / 2;
  }

  onDocumentTouchStart(event) {
    if (event.touches.length > 1) {
      // event.preventDefault();
      this.mouseX = event.touches[0].pageX - this.windowHalfX;
      this.mouseY = event.touches[0].pageY - this.windowHalfY;
    }
  }

  onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      // event.preventDefault();
      this.mouseX = event.touches[0].pageX - this.windowHalfX;
      this.mouseY = event.touches[0].pageY - this.windowHalfY;
    } else {
      this.mouseX += 0.05;
      this.mouseY -= 0.05;
    }
  }

  init() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    this.camera = new THREE.PerspectiveCamera(315,
      window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 650;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.autoClear = false;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.shadowMapSoft = true;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    // particles
    this.material = new THREE.SpriteMaterial({ color: 0xFFB86F });
    this.geometry = new THREE.Geometry();
    this.particles = [];

    for (let i = 0; i < 100; i += 1) {
      this.particle = new THREE.Sprite(this.material);
      this.particle.position.x = Math.random() * 3 - 1;
      this.particle.position.y = Math.random() * 2 - 1;
      this.particle.position.z = Math.random() * 5 - 1;
      this.particle.position.normalize();
      this.particle.position.multiplyScalar(Math.random() * 12 + 350);
      this.particle.scale.x = Math.random() * 3;
      this.particle.scale.y = Math.random() * 3;
      this.scene.add(this.particle);

      this.particles.push(this.particle);
      this.geometry.vertices.push(this.particle.position);
    }

    // lines
    const line = new THREE.Line(this.geometry,
      new THREE.LineBasicMaterial({ color: 0x161616, opacity: 1, linewidth: 0.5 }));
    this.scene.add(line);

    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('touchstart', this.onDocumentTouchStart, false);
    document.addEventListener('touchmove', this.onDocumentTouchMove, false);
    window.addEventListener('resize', this.onWindowResize, false);

    const { hideLoader } = this.props;
    hideLoader();

    this.animate();
  }

  animate() {
    this.requestId = requestAnimationFrame(this.animate);
    this.animateFrame();
  }

  animateFrame() {
    if (this.xDirection) {
      if (this.mouseX >= 500) {
        this.xDirection = false;
      } else {
        this.mouseX += 0.1;
      }
    } else if (this.mouseX < -500) {
      this.xDirection = true;
    } else {
      this.mouseX -= 0.1;
    }

    if (this.yDirection) {
      if (this.mouseY >= 400) {
        this.yDirection = false;
      } else {
        this.mouseY += 0.1;
      }
    } else if (this.mouseY <= -400) {
      this.yDirection = true;
    } else {
      this.mouseY -= 0.1;
    }

    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.015;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.015;
    this.camera.lookAt(this.scene.position);
    this.camera.rotation.x += (5 * Math.PI) / 180;
    this.camera.rotation.y += (5 * Math.PI) / 180;
    this.renderer.render(this.scene, this.camera);
  }

  stop() {
    cancelAnimationFrame(this.requestId);
    this.requestId = undefined;
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
