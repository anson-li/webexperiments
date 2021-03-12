import React, { PureComponent } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

import './style.scss';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

class JellicentObject extends PureComponent {
  constructor(props) {
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
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  init() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    this.camera = new THREE.PerspectiveCamera(50,
      window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.x = 26.2;
    this.camera.position.y = 38.6;
    this.camera.position.z = 23;
    this.camera.rotation.x = 0.44;
    this.camera.rotation.y = -0.31;
    this.camera.rotation.z = -167.14;

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

    // eslint-disable-next-line global-require
    const jsonObject = require('../../../../../web/assets/scene/jellicent.json');
    this.scene = new THREE.ObjectLoader().parse(jsonObject);

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    this.glitchPass = new GlitchPass();
    this.composer.addPass(this.glitchPass);

    window.addEventListener('resize', this.onWindowResize, false);
    const { hideLoader } = this.props;
    hideLoader();
    this.animate();
  }

  animate() {
    this.animateCamera();
    this.requestId = requestAnimationFrame(this.animate);
    if (this.composer) {
      this.composer.render();
    }
  }

  stop() {
    cancelAnimationFrame(this.requestId);
    this.requestId = undefined;
  }

  animateCamera() {
    if (this.camera) {
      this.camera.rotation.x -= 0.001;
      if (this.camera.rotation.x < -1.3) {
        this.camera.rotation.x = 0.8;
      }
    }
  }

  render() {
    return (
      <>
        <div id="jellicent-details" className="col-4 d-none d-lg-block">
          <h4 id="jellicent-details-header">
            Jellicent - #593
          </h4>
          <p id="jellicent-details-body">
            Jellicent is a large jellyfish-like Pokémon whose
            appearance varies based on gender. Both genders
            have five tentacles, two of which are long with
            petal-shaped ends. The remaining three are short and tapered.
            {' '}
            <br />
            <br />
            A male is blue with a short, white crown, and a white,
            mustache-like collar. Its eyes are red with blue sclerae,
            and there is one eyelash over each eye. Its long tentacles
            have white edges, while its short tentacles have white spots.
            A female is pink with a tall, white crown and a puffy, white
            collar. Its eyes are blue with red sclerae and surrounded by
            two eyelashes. Its mouth is red and heart-shaped. The long
            tentacles have white edges like the male, but the short ones have white frills.
          </p>
        </div>
        <div ref={(ref) => { this.mount = ref; }} />
      </>
    );
  }
}

JellicentObject.propTypes = {
  hideLoader: PropTypes.func.isRequired,
};

export default JellicentObject;
