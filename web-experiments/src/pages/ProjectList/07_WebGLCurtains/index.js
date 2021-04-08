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
import WithTransition from '../../../common/WithTransition';
import BasicFs from './Shaders/BasicFs';
import BasicVs from './Shaders/BasicVs';
import ColorFs from './Shaders/ColorFs';
import DragFs from './Shaders/DragFs';
import DragVs from './Shaders/DragVs';
import TestImage from './images/canvas-base.jpg';
import styles from './style.module.scss';

class WebGLCurtains extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      pattern: {
        color: false,
        disabled: false,
        draganimation: false,
        oscillate: true,
      },
    };

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

    const bookOfShaders = this.gui.addFolder('Book of Shaders');
    bookOfShaders.add(this.state.pattern, 'color').name('Basic Color').listen().onChange(() => {
      this.setChecked('color');
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
    window.addEventListener('mousemove', (event) => {
      this.handleMovement(event, plane);
    });

    window.addEventListener('touchmove', (event) => {
      this.handleMovement(event, plane);
    });
  }

  handleMovement (event, plane) {
    if (event.targetTouches) {
      // touch event
      this.mousePosition.x = event.targetTouches[0].clientX;
      this.mousePosition.y = event.targetTouches[0].clientY;
    } else {
      // mouse event
      this.mousePosition.x = event.clientX;
      this.mousePosition.y = event.clientY;
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
      console.log(Math.abs(Math.sin(plane.uniforms.time.value)));
    };

    return (
      <div
        id='main-page' ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        { pattern === 'oscillate' &&
        <Curtains className={styles['curtains-canvas']}>
          <Plane
            className={styles['curtains-plane']}
            fragmentShader={BasicFs}
            onRender={onRender}
            uniforms={basicUniforms}
            vertexShader={BasicVs}
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
              fragmentShader={DragFs}
              heightSegments={20}
              onReady={this.handlePlaneReady}
              onRender={onRender}
              uniforms={dragUniforms}
              vertexShader={DragVs}
              widthSegments={20}
            >
              <img alt='Test for canvas' src={TestImage} />
            </Plane>
          </Curtains>
        </>}
        { pattern === 'color' &&
        <>
          <Curtains className={styles['curtains-canvas']}>
            <Plane
              className={styles['curtains-plane']}
              fov={35}
              fragmentShader={ColorFs}
              heightSegments={20}
              onReady={this.handlePlaneReady}
              onRender={onRender}
              uniforms={dragUniforms}
              vertexShader={BasicVs}
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

export default WithTransition(WebGLCurtains);
