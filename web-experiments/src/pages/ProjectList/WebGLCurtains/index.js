import React, { PureComponent } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import { Curtains, Plane } from 'react-curtains';
import * as dat from 'dat.gui';

import withTransition from '../../../common/WithTransition';
import TextLogo from '../../../common/TextLogo';

import TestImage from './images/canvas-base.jpg';

import './style.scss';

class WebGLCurtains extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pattern: {
          oscillate: true,
          disabled: false,
          draganimation: false
      }
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
    this.onPlaneReady = this.onPlaneReady.bind(this);
    this.gui = null;
    this.mousePosition = {
      x: 0,
      y: 0,
    };
  }

  hidePage() {
    anime.remove(this.el);
    return anime({
      targets: this.el,
      opacity: 0,
      duration: 0,
    }).finished;
  }

  animateIn() {
    anime.remove(this.el);
    return anime({
      targets: this.el,
      opacity: [0, 1],
      duration: 1000,
      delay: 1000,
      easing: 'easeOutExpo',
    }).finished;
  }

  animateOut() {
    anime.remove(this.el);
    const { showLoader } = this.props;
    showLoader();
    return anime({
      targets: this.el,
      opacity: 0,
      duration: 1000,
      easing: 'easeOutExpo',
    }).finished;
  }

  componentDidMount() {
    this.props.hideLoader();
    this.gui = new dat.GUI();
    
    var patterns = this.gui.addFolder("Patterns");
    patterns.add(this.state.pattern, 'oscillate').name('Oscillate').listen().onChange(function(){ this.setChecked("oscillate"); }.bind(this));
    patterns.add(this.state.pattern, 'disabled').name('Disabled').listen().onChange(function(){ this.setChecked("disabled"); }.bind(this));
    patterns.add(this.state.pattern, 'draganimation').name('Drag Animation').listen().onChange(function(){ this.setChecked("draganimation"); }.bind(this));

    this.mousePosition = {
      x: 0,
      y: 0,
    };
  }

  onPlaneReady(plane) {

    // set a field of view of 35 to exagerate perspective
    // we could have done  it directly in the initial params
    // plane.setPerspective(35);

    // listen our mouse/touch events on the whole document
    // we will pass the plane as second argument of our function
    // we could be handling multiple planes that way
    window.addEventListener("mousemove", function(e) {
      this.handleMovement(e, plane);
    }.bind(this));

    window.addEventListener("touchmove", function(e) {
      this.handleMovement(e, plane);
    }.bind(this));
  }

  handleMovement(e, plane) {    

    console.log('EeeEe');

    // touch event
    if(e.targetTouches) {
      this.mousePosition.x = e.targetTouches[0].clientX;
      this.mousePosition.y = e.targetTouches[0].clientY;
    }
    // mouse event
    else {
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
    }

    // convert our mouse/touch position to coordinates relative to the vertices of the plane
    var mouseCoords = plane.mouseToPlaneCoords(this.mousePosition);

    // update our mouse position uniform
    plane.uniforms.mousePosition.value = [mouseCoords.x, mouseCoords.y];

    // reassign mouse strength
    plane.uniforms.mouseStrength.value = 0.5;
  }

  setChecked(prop) {
    const { pattern } = this.state;
    for (let param in pattern) {
      if (prop !== param) {
        pattern[param] = false;
      } else {
        pattern[param] = true;
      }
    }
    this.setState({ pattern });
    this.forceUpdate();
  }

  getActivePattern() {
    const { pattern } = this.state;
    for (let param in pattern) {
      if (pattern[param]) {
        return param;
      }
    }
  }

  componentWillUnmount() {
    this.gui.destroy();
    window.removeEventListener('mousemove', this.handleMovement);
    window.removeEventListener('touchmove', this.handleMovement);
  }

  render() {
    const { cursorHover, cursorUnhover } = this.props;
    let pattern = this.getActivePattern();
    const basicUniforms = {
      time: {
        name: "uTime",
        type: "1f",
        value: 0
      }
    };
    const dragUniforms = {
      time: {
        name: "uTime", // uniform name that will be passed to our shaders
        type: "1f", // this means our uniform is a float
        value: 0,
      },
      mousePosition: { // our mouse position
        name: "uMousePosition",
        type: "2f", // notice this is a length 2 array of floats
        value: [this.mousePosition.x, this.mousePosition.y],
      },
      mouseStrength: { // the strength of the effect (we will attenuate it if the mouse stops moving)
        name: "uMouseStrength", // uniform name that will be passed to our shaders
        type: "1f", // this means our uniform is a float
        value: 0,
      },
    }
    const onRender = (plane) => {
      plane.uniforms.time.value++;
    };
    return (
      <div id="main-page" ref={(e) => { this.el = e; }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        { (pattern === 'oscillate') &&
          <Curtains>
            <Plane
                className="curtains-plane"
                
                // plane init parameters
                vertexShader={this.basicVs}
                fragmentShader={this.basicFs}
                uniforms={basicUniforms}

                // plane events
                onRender={onRender}
            >
              <img src={TestImage} alt='Test for canvas' />
            </Plane>
          </Curtains>
        }
        { (pattern === 'disabled') &&
          <div className='curtains-canvas'>
            <div className='curtains-plane'>
              <img className='disabled-image' src={TestImage} alt='Test for canvas' />
            </div>
          </div>
        }
        { (pattern === 'draganimation') &&
          <>
            <Curtains>
              <Plane
                  className="curtains-plane"
                  
                  // plane init parameters
                  vertexShader={this.dragVs}
                  fragmentShader={this.dragFs}
                  uniforms={dragUniforms}
                  widthSegments={20}
                  heightSegments={20}
                  fov={35}
                  onReady={this.onPlaneReady}

                  // plane events
                  onRender={onRender}
              >
                <img src={TestImage} alt='Test for canvas' />
              </Plane>
            </Curtains>
          </>
        }
      </div>
    );
  }
}

WebGLCurtains.propTypes = {
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  cursorHover: PropTypes.func.isRequired,
};

export default withTransition(WebGLCurtains);
