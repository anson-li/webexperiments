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
import styles from './style.module.scss';

class ImageParticles extends PureComponent {
  constructor (props) {
    super(props);

    this.init = this.init.bind(this);
    this.animate = this.animate.bind(this);
    this.next = this.next.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);

    this.renderer = null;
    this.container = null;
    this.particles = null;
    this.scene = null;
    this.camera = null;
    this.raf = null;
    this.currSample = null;

    this.samples = [
      require('../images/sample-1.png'),
      require('../images/sample-2.jpg'),
      require('../images/sample-3.jpg'),
      require('../images/sample-4.jpeg'),
    ];

    this.sample = 0;
  }

  componentDidMount () {
    setTimeout(() => {
      this.init();
      this.initParticles();
      this.initControls();
      this.animate();
      this.resize();

      this.goto(this.sample);
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
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.devicePixelRatio > 1) {
      this.renderer.setPixelRatio(window.devicePixelRatio);
    }
    this.clock = new Clock(true);
    this.container.appendChild(this.renderer.domElement);
  }

  initControls () {
    this.interactive = new InteractiveControls(this.camera, this.renderer.domElement);

    // window.addEventListener('click', this.next);
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

  handleChangeValue (event) {
    this.sample = event.target.value;
    this.goto(this.sample);
  }

  render () {
    return (
      <>
        <div
          className={styles['input-radio']}
          onChange={this.handleChangeValue}
        >
          <input defaultChecked name='image' type='radio' value='0' />
          <input name='image' type='radio' value='1' />
          <input name='image' type='radio' value='2' />
          <input name='image' type='radio' value='3' />
        </div>
        <div ref={(ref) => {
          this.mount = ref;
        }} />
      </>
    );
  }
}

export default ImageParticles;
