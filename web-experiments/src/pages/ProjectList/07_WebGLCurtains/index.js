import anime from 'animejs';
import {
  GUI,
} from 'dat.gui';
import {
  gsap,
} from 'gsap';
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
import MouseColorFs from './Shaders/MouseColorFs';
import MouseOpacityFs from './Shaders/MouseOpacityFs';
import MouseOverFs from './Shaders/MouseOverFs';
import ZoomMouseFs from './Shaders/ZoomMouseFs';
import TestAlternate from './images/canvas-alternate.jpg';
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
        mousecolor: false,
        mouselayer: false,
        mouseopacity: false,
        mouseover: true,
        oscillate: false,
        zoomdrag: false,
        zoommouse: false,
      },
    };

    this.handleInteractCanvasEnd = this.handleInteractCanvasEnd.bind(this);
    this.handleInteractCanvasStart = this.handleInteractCanvasStart.bind(this);
    this.setChecked = this.setChecked.bind(this);
    this.handleMovement = this.handleMovement.bind(this);
    this.handlePlaneReady = this.handlePlaneReady.bind(this);
    this.gui = null;
    this.mousePosition = {
      x: 0,
      y: 0,
    };
    this.progress = 0;
  }

  componentDidMount () {
    this.props.hideLoader();
    this.gui = new GUI();
    this.gui.width = 500;
    this.gui.closed = false;

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
    bookOfShaders.add(this.state.pattern, 'mousecolor').name('Color Mouse').listen().onChange(() => {
      this.setChecked('mousecolor');
    });
    bookOfShaders.add(this.state.pattern, 'mouseopacity').name('Opacity Mouse').listen().onChange(() => {
      this.setChecked('mouseopacity');
    });
    bookOfShaders.add(this.state.pattern, 'mouselayer').name('Opacity Layered Mouse').listen().onChange(() => {
      this.setChecked('mouselayer');
    });
    bookOfShaders.add(this.state.pattern, 'zoommouse').name('Zoom Mouse').listen().onChange(() => {
      this.setChecked('zoommouse');
    });
    bookOfShaders.add(this.state.pattern, 'zoomdrag').name('Zoom Drag').listen().onChange(() => {
      this.setChecked('zoomdrag');
    });
    bookOfShaders.add(this.state.pattern, 'mouseover').name('Hover Interaction').listen().onChange(() => {
      this.setChecked('mouseover');
    });

    this.mousePosition = {
      x: 0,
      y: 0,
    };
    this.progress = 0;
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

  handleInteractCanvasStart () {
    gsap.to(this, 0.5, {
      ease: 'expo.inOut',
      progress: 1,
    });
  }

  handleInteractCanvasEnd () {
    gsap.to(this, 0.5, {
      ease: 'expo.inOut',
      progress: 0,
    });
  }

  handlePlaneReady (plane) {
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
      progress: {
        name: 'uProgress',
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
    const onRenderMouseOver = (plane) => {
      plane.uniforms.time.value++;
      plane.uniforms.progress.value = this.progress;
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
        { pattern === 'mousecolor' &&
        <>
          <Curtains className={styles['curtains-canvas']}>
            <Plane
              className={styles['curtains-plane']}
              fov={35}
              fragmentShader={MouseColorFs}
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
        { pattern === 'mouseopacity' &&
        <>
          <Curtains className={styles['curtains-canvas']}>
            <Plane
              className={styles['curtains-plane']}
              fov={35}
              fragmentShader={MouseOpacityFs}
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
        { pattern === 'mouselayer' &&
        <>
          <Curtains className={styles['curtains-canvas']}>
            <Plane
              className={styles['curtains-plane']}
              fov={35}
              fragmentShader={MouseOpacityFs}
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
          <div className={styles['curtains-canvas']} style={{zIndex: -1}}>
            <div className={styles['curtains-plane']}>
              <img alt='Test for canvas' className={styles['mouse-opacity-image']} src={TestAlternate} />
            </div>
          </div>
        </>}
        { pattern === 'zoommouse' &&
        <>
          <Curtains className={styles['curtains-canvas']}>
            <Plane
              className={styles['curtains-plane']}
              fov={35}
              fragmentShader={ZoomMouseFs}
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
        { pattern === 'zoomdrag' &&
        <>
          <Curtains className={styles['curtains-canvas']}>
            <Plane
              className={styles['curtains-plane']}
              fov={35}
              fragmentShader={ZoomMouseFs}
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
        { pattern === 'mouseover' &&
        <>
          <Curtains className={styles['curtains-canvas']} style={{zIndex: -1}}>
            <Plane
              className={styles['curtains-plane']}
              fov={35}
              fragmentShader={MouseOverFs}
              heightSegments={20}
              onMouseOut={this.handleInteractCanvasEnd}
              onMouseOver={this.handleInteractCanvasStart}
              onRender={onRenderMouseOver}
              uniforms={dragUniforms}
              vertexShader={DragVs}
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
