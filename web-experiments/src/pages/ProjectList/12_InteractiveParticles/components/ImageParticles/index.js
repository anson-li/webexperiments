/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/always-return */
import React, {
  PureComponent,
} from 'react';
import {
  Scene, PerspectiveCamera, WebGLRenderer, Clock,
} from 'three';
import InteractiveControls from '../InteractiveControls';
import Particles from '../Particles';

class ImageParticles extends PureComponent {
  constructor (props) {
    super(props);

    this.init = this.init.bind(this);
    this.animate = this.animate.bind(this);

    this.renderer = null;
    this.container = null;
    this.particles = null;
    this.scene = null;
    this.camera = null;
    this.raf = null;
    this.currSample = null;

    this.samples = [
      '../images/sample-1.jpg',
      '../images/sample-2.jpg',
      '../images/sample-3.jpg',
    ];
  }

  componentDidMount () {
    setTimeout(() => {
      this.init();
      this.initParticles();
      this.initControls();
      this.animate();
      this.resize();

      const rnd = ~~(Math.random() * this.samples.length);
      this.goto(rnd);
    }, 1000);
  }

  componentWillUnmount () {
  }

  animate () {
    this.update();
    this.draw();

    this.raf = requestAnimationFrame(this.animate);
  }

  init () {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 300;
    this.renderer = new WebGLRenderer({alpha: true,
      antialias: true});
    this.clock = new Clock(true);
    this.container.appendChild(this.renderer.domElement);
  }

  initControls () {
    this.interactive = new InteractiveControls(this.camera, this.renderer.domElement);
  }

  initParticles () {
    this.particles = new Particles(this);
    this.scene.add(this.particles.container);
  }

  update () {
    const delta = this.clock.getDelta();

    if (this.particles) {
      this.particles.update(delta);
    }
  }

  draw () {
    this.renderer.render(this.scene, this.camera);
  }

  goto (index) {
    // init next
    if (this.currSample === null) {
      this.particles.init(this.samples[index]);
    }

    // hide curr then init next
    else {
      this.particles.hide(true).then(() => {
        this.particles.init(this.samples[index]);
      });
    }

    this.currSample = index;
  }

  next () {
    if (this.currSample < this.samples.length - 1) {
      this.goto(this.currSample + 1);
    } else {
      this.goto(0);
    }
  }

  resize () {
    if (!this.renderer) {
      return;
    }
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.fovHeight = 2 * Math.tan(this.camera.fov * Math.PI / 180 / 2) * this.camera.position.z;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    if (this.interactive) {
      this.interactive.resize();
    }
    if (this.particles) {
      this.particles.resize();
    }
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
