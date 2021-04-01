import React, { PureComponent } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import { Curtains, Plane } from 'react-curtains';

import withTransition from '../../../common/WithTransition';
import TextLogo from '../../../common/TextLogo';

import TestImage from './images/canvas-base.jpg';

import './style.scss';

class WebGLCurtains extends PureComponent {
  constructor(props) {
    super(props);
    
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
  }

  render() {
    const { cursorHover, cursorUnhover } = this.props;
    const basicUniforms = {
      time: {
        name: "uTime",
        type: "1f",
        value: 0
      }
    };
    const onRender = (plane) => {
      plane.uniforms.time.value++;
    };
    return (
      <div id="main-page" ref={(e) => { this.el = e; }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
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
