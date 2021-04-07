import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  PerspectiveCamera, Scene, WebGLRenderer, PCFShadowMap, ObjectLoader, Color,
} from 'three';
import {
  EffectComposer,
} from 'three/examples/jsm/postprocessing/EffectComposer';
import {
  RenderPass,
} from 'three/examples/jsm/postprocessing/RenderPass';

// import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

class JellicentObject extends PureComponent {
  constructor (props) {
    super(props);
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.composer = null;
    this.renderPass = null;
    this.glitchPass = null;
    this.container = null;
    this.requestId = null;

    this.onWindowResize = this.onWindowResize.bind(this);
    this.init = this.init.bind(this);
    this.animate = this.animate.bind(this);
    this.animateCamera = this.animateCamera.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount () {
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize);
    this.container.removeChild(this.renderer.domElement);
    this.stop();
    this.loader = null;
    this.scene = null;
    this.camera = null;
    this.composer = null;
    this.renderer = null;
  }

  onWindowResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  init () {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    this.camera = new PerspectiveCamera(50,
      window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.x = 26.2;
    this.camera.position.y = 38.6;
    this.camera.position.z = 23;
    this.camera.rotation.x = 0.44;
    this.camera.rotation.y = -0.31;
    this.camera.rotation.z = -167.14;

    this.scene = new Scene();

    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.autoClear = false;
    this.renderer.shadowMap.type = PCFShadowMap;
    this.renderer.shadowMapSoft = true;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    const jsonObject = require('../../../../../web/assets/scene/jellicent.json');
    this.scene = new ObjectLoader().parse(jsonObject);
    this.scene.background = new Color(0x111111);

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    // this.glitchPass = new GlitchPass();
    // this.composer.addPass(this.glitchPass);

    window.addEventListener('resize', this.onWindowResize, false);
    window.addEventListener('mousemove', this.mousemove);

    const {hideLoader} = this.props;

    this.camera.rotation.x = 0;
    this.camera.rotation.z = 0.5;
    this.camera.rotation.y = 6.1;

    hideLoader();
    this.animate();
  }

  animate () {
    this.animateCamera();
    this.requestId = requestAnimationFrame(this.animate);
    if (this.composer) {
      this.composer.render();
    }
  }

  stop () {
    cancelAnimationFrame(this.requestId);
    this.requestId = undefined;
  }

  animateCamera () {
    if (this.camera) {
      this.camera.rotation.x -= 0.0005;
      if (this.camera.rotation.x < -1.3) {
        this.camera.rotation.x = 0.8;
      }
    }
  }

  mousemove (event) {
    if (this.camera) {
      this.camera.rotation.z = 0.5 + 0.0001 * event.clientX;
      this.camera.rotation.y = 6.1 + 0.0001 * event.clientY;
    }
  }

  render () {
    return (
      <>
        <div ref={(ref) => {
          this.mount = ref;
        }} />
      </>
    );
  }
}

JellicentObject.propTypes = {
  hideLoader: PropTypes.func.isRequired,
};

export default JellicentObject;
