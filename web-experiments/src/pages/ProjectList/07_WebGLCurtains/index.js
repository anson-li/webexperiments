import anime from 'animejs';
import {
  GUI,
} from 'dat.gui';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Curtains, Plane,
} from 'react-curtains';
import TextLogo from '../../../common/TextLogo';
import withTransition from '../../../common/WithTransition';
import TestImage from './images/canvas-base.jpg';
import styles from './style.module.scss';

class WebGLCurtains extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      pattern: {
        disabled: false,
        draganimation: false,
        oscillate: true,
      },
    };

    this.basicVs = `
      precision mediump float;

      attribute vec3 aVertexPosition;
      attribute vec2 aTextureCoord;

      uniform mat4 uMVMatrix;
      uniform mat4 uPMatrix;

      uniform mat4 uTextureMatrix0;

      varying vec3 vVertexPosition;
      varying vec2 vTextureCoord;

      void main() {
          gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
          
          // varyings
          vVertexPosition = aVertexPosition;
          vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
      }
    `;

    this.basicFs = `
      precision mediump float;

      varying vec3 vVertexPosition;
      varying vec2 vTextureCoord;
      
      uniform sampler2D uSampler0;
      
      uniform float uTime;
      
      void main() {
          vec2 textureCoord = vTextureCoord;
          // displace our pixels along the X axis based on our time uniform
          // textures coords are ranging from 0.0 to 1.0 on both axis
          textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(uTime / 50.0)) / 25.0;
          
          gl_FragColor = texture2D(uSampler0, textureCoord);
      }
    `;

    this.dragVs = `
      precision mediump float;

      // those are the mandatory attributes that the lib sets
      attribute vec3 aVertexPosition;
      attribute vec2 aTextureCoord;

      // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
      uniform mat4 uMVMatrix;
      uniform mat4 uPMatrix;
          
      // our texture matrix uniform (this is the lib default name, but it could be changed)
      uniform mat4 uTextureMatrix0;

      // our time uniform
      uniform float uTime;

      // our mouse position uniform
      uniform vec2 uMousePosition;

      // our mouse strength
      uniform float uMouseStrength;

      // if you want to pass your vertex and texture coords to the fragment shader
      varying vec3 vVertexPosition;
      varying vec2 vTextureCoord;

      void main() {
        vec3 vertexPosition = aVertexPosition;

        // get the distance between our vertex and the mouse position
        float distanceFromMouse = distance(uMousePosition, vec2(vertexPosition.x, vertexPosition.y));

        // this will define how close the ripples will be from each other. The bigger the number, the more ripples you'll get
        float rippleFactor = 1.0;
        // calculate our ripple effect
        float rippleEffect = cos(rippleFactor * (distanceFromMouse));

        // calculate our distortion effect
        float distortionEffect = rippleEffect * uMouseStrength;

        // apply it to our vertex position
        vertexPosition += distortionEffect / 30.0;

        gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

        // varyings
        // thanks to the texture matrix we will be able to calculate accurate texture coords
        // so that our texture will always fit our plane without being distorted
          vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
          vVertexPosition = vertexPosition;
      }
    `;

    this.dragFs = `
      precision mediump float;

      // get our varyings
      varying vec3 vVertexPosition;
      varying vec2 vTextureCoord;

      // our texture sampler (this is the lib default name, but it could be changed)
      uniform sampler2D uSampler0;

      void main() {
        // get our texture coords
        vec2 textureCoords = vTextureCoord;

        // apply our texture
        vec4 finalColor = texture2D(uSampler0, textureCoords);

        // fake shadows based on vertex position along Z axis
        finalColor.rgb -= clamp(-vVertexPosition.z, 0.0, 1.0);
        // fake lights based on vertex position along Z axis
        finalColor.rgb += clamp(vVertexPosition.z, 0.0, 1.0);

        // handling premultiplied alpha (useful if we were using a png with transparency)
        finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);

        gl_FragColor = finalColor;
      }
    `;

    this.setChecked = this.setChecked.bind(this);
    this.handleMovement = this.handleMovement.bind(this);
    this.handlePlaneReady = this.handlePlaneReady.bind(this);
    this.gui = null;
    this.mousePosition = {
      x: 0,
      y: 0,
    };
  }

  componentDidMount () {
    this.props.hideLoader();
    this.gui = new GUI();

    const patterns = this.gui.addFolder('Patterns');
    patterns.add(this.state.pattern, 'oscillate').name('Oscillate').listen().onChange(() => {
      this.setChecked('oscillate');
    });
    patterns.add(this.state.pattern, 'disabled').name('Disabled').listen().onChange(() => {
      this.setChecked('disabled');
    });
    patterns.add(this.state.pattern, 'draganimation').name('Drag Animation').listen().onChange(() => {
      this.setChecked('draganimation');
    });

    this.mousePosition = {
      x: 0,
      y: 0,
    };
  }

  componentWillUnmount () {
    this.gui.destroy();
    window.removeEventListener('mousemove', this.handleMovement);
    window.removeEventListener('touchmove', this.handleMovement);
  }

  hidePage () {
    anime.remove(this.el);

    return anime({
      duration: 0,
      opacity: 0,
      targets: this.el,
    }).finished;
  }

  animateIn () {
    anime.remove(this.el);

    return anime({
      delay: 1000,
      duration: 1000,
      easing: 'easeOutExpo',
      opacity: [0, 1],
      targets: this.el,
    }).finished;
  }

  animateOut () {
    anime.remove(this.el);
    const {showLoader} = this.props;
    showLoader();

    return anime({
      duration: 1000,
      easing: 'easeOutExpo',
      opacity: 0,
      targets: this.el,
    }).finished;
  }

  handlePlaneReady (plane) {
    // set a field of view of 35 to exagerate perspective
    // we could have done  it directly in the initial params
    // plane.setPerspective(35);

    // listen our mouse/touch events on the whole document
    // we will pass the plane as second argument of our function
    // we could be handling multiple planes that way
    window.addEventListener('mousemove', (e) => {
      this.handleMovement(e, plane);
    });

    window.addEventListener('touchmove', (e) => {
      this.handleMovement(e, plane);
    });
  }

  handleMovement (e, plane) {
    if (e.targetTouches) {
      // touch event
      this.mousePosition.x = e.targetTouches[0].clientX;
      this.mousePosition.y = e.targetTouches[0].clientY;
    } else {
      // mouse event
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
    }

    // convert our mouse/touch position to coordinates relative to the vertices of the plane
    const mouseCoords = plane.mouseToPlaneCoords(this.mousePosition);

    // update our mouse position uniform
    plane.uniforms.mousePosition.value = [mouseCoords.x, mouseCoords.y];

    // reassign mouse strength
    plane.uniforms.mouseStrength.value = 0.5;
  }

  setChecked (prop) {
    const {pattern} = this.state;
    for (const param in pattern) {
      if (param) {
        pattern[param] = prop === param;
      }
    }
    this.setState({pattern});
    this.forceUpdate();
  }

  getActivePattern () {
    const {pattern} = this.state;
    for (const param in pattern) {
      if (pattern[param]) {
        return param;
      }
    }

    return '';
  }

  render () {
    const {cursorHover, cursorUnhover} = this.props;
    const pattern = this.getActivePattern();
    const basicUniforms = {
      time: {
        name: 'uTime',
        type: '1f',
        value: 0,
      },
    };
    const dragUniforms = {
      mousePosition: {
        name: 'uMousePosition',
        type: '2f',
        value: [this.mousePosition.x, this.mousePosition.y],
      },
      mouseStrength: {
        name: 'uMouseStrength',
        type: '1f',
        value: 0,
      },
      time: {
        name: 'uTime',
        type: '1f',
        value: 0,
      },
    };
    const onRender = (plane) => {
      plane.uniforms.time.value++;
    };

    return (
      <div
        id='main-page' ref={(e) => {
          this.el = e;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        { pattern === 'oscillate' &&
        <Curtains className={styles['curtains-canvas']}>
          <Plane
            className={styles['curtains-plane']}
            fragmentShader={this.basicFs}
            onRender={onRender}
            uniforms={basicUniforms}
            vertexShader={this.basicVs}
          >
            <img alt='Test for canvas' src={TestImage} />
          </Plane>
        </Curtains>}
        { pattern === 'disabled' &&
        <div className={styles['curtains-canvas']}>
          <div className={styles['curtains-plane']}>
            <img alt='Test for canvas' className={styles['disabled-image']} src={TestImage} />
          </div>
        </div>}
        { pattern === 'draganimation' &&
        <>
          <Curtains className={styles['curtains-canvas']}>
            <Plane
              className={styles['curtains-plane']}
              fov={35}
              fragmentShader={this.dragFs}
              heightSegments={20}
              onReady={this.handlePlaneReady}
              onRender={onRender}
              uniforms={dragUniforms}
              vertexShader={this.dragVs}
              widthSegments={20}
            >
              <img alt='Test for canvas' src={TestImage} />
            </Plane>
          </Curtains>
        </>}
      </div>
    );
  }
}

WebGLCurtains.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

export default withTransition(WebGLCurtains);
