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
import DragWaterVs from './Shaders/DragWaterVs';
import HorizontalDragVs from './Shaders/HorizontalDragVs';
import MouseColorFs from './Shaders/MouseColorFs';
import MouseOpacityFs from './Shaders/MouseOpacityFs';
import MouseOverFs from './Shaders/MouseOverFs';
import NoiseFs from './Shaders/NoiseFs';
import NoisyPageFs from './Shaders/NoisyPageFs';
import PerlinMouseFs from './Shaders/PerlinMouseFs';
import VerticalDragVs from './Shaders/VerticalDragVs';
import ZoomMouseFs from './Shaders/ZoomMouseFs';
import TestImage from './images/canvas-base.jpg';
import styles from './style.module.scss';

class WebGLCurtains extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      fragmentshader: {
        color: {
          ref: ColorFs,
          status: false,
        },
        mousecolor: {
          ref: MouseColorFs,
          status: false,
        },
        mouseopacity: {
          ref: MouseOpacityFs,
          status: false,
        },
        noisefade: {
          ref: NoiseFs,
          status: false,
        },
        noisypage: {
          ref: NoisyPageFs,
          status: true,
        },
        none: {
          ref: DragFs,
          status: false,
        },
        oscillate: {
          ref: BasicFs,
          status: false,
        },
        perlinmouse: {
          ref: PerlinMouseFs,
          status: false,
        },
        zoommouse: {
          ref: ZoomMouseFs,
          status: false,
        },
      },
      hoveranimations: {
        none: true,
        zoom: false,
      },
      vertexshader: {
        draganimation: {
          ref: DragVs,
          status: true,
        },
        dragwater: {
          ref: DragWaterVs,
          status: false,
        },
        horizontaldrag: {
          ref: HorizontalDragVs,
          status: false,
        },
        none: {
          ref: BasicVs,
          status: false,
        },
        verticaldrag: {
          ref: VerticalDragVs,
          status: false,
        },
      },
    };

    this.handleInteractCanvasEnd = this.handleInteractCanvasEnd.bind(this);
    this.handleInteractCanvasStart = this.handleInteractCanvasStart.bind(this);
    this.setFragmentChecked = this.setFragmentChecked.bind(this);
    this.setVertexChecked = this.setVertexChecked.bind(this);
    this.setHoverChecked = this.setHoverChecked.bind(this);
    this.handleMovement = this.handleMovement.bind(this);
    this.handlePlaneReady = this.handlePlaneReady.bind(this);
    this.getActiveFragment = this.getActiveFragment.bind(this);
    this.getActiveHover = this.getActiveHover.bind(this);
    this.getActiveVertex = this.getActiveVertex.bind(this);
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

    const fragmentShader = this.gui.addFolder('Fragment Shaders');
    fragmentShader.add(this.state.fragmentshader.none, 'status').name('None').listen().onChange(() => {
      this.setFragmentChecked('none');
    });
    fragmentShader.add(this.state.fragmentshader.oscillate, 'status').name('Automatically oscillate').listen().onChange(() => {
      this.setFragmentChecked('oscillate');
    });
    fragmentShader.add(this.state.fragmentshader.color, 'status').name('Automatically change colors').listen().onChange(() => {
      this.setFragmentChecked('color');
    });
    fragmentShader.add(this.state.fragmentshader.mousecolor, 'status').name('Color shifting via mouse position').listen().onChange(() => {
      this.setFragmentChecked('mousecolor');
    });
    fragmentShader.add(this.state.fragmentshader.mouseopacity, 'status').name('Opacity shifting via mouse position').listen().onChange(() => {
      this.setFragmentChecked('mouseopacity');
    });
    fragmentShader.add(this.state.fragmentshader.noisefade, 'status').name('Fade in image using noise').listen().onChange(() => {
      this.setFragmentChecked('noisefade');
    });
    fragmentShader.add(this.state.fragmentshader.noisypage, 'status').name('Perlin generated noise').listen().onChange(() => {
      this.setFragmentChecked('noisypage');
    });
    fragmentShader.add(this.state.fragmentshader.perlinmouse, 'status').name('Perlin noise mouseover').listen().onChange(() => {
      this.setFragmentChecked('perlinmouse');
    });
    fragmentShader.add(this.state.fragmentshader.zoommouse, 'status').name('Zoom into picture via mouse position').listen().onChange(() => {
      this.setFragmentChecked('zoommouse');
    });
    fragmentShader.open();

    const vertexShader = this.gui.addFolder('Vertex Shaders');
    vertexShader.add(this.state.vertexshader.none, 'status').name('None').listen().onChange(() => {
      this.setVertexChecked('none');
    });
    vertexShader.add(this.state.vertexshader.draganimation, 'status').name('Paper simulated X/Y axis').listen().onChange(() => {
      this.setVertexChecked('draganimation');
    });
    vertexShader.add(this.state.vertexshader.horizontaldrag, 'status').name('Paper simulated X only').listen().onChange(() => {
      this.setVertexChecked('horizontaldrag');
    });
    vertexShader.add(this.state.vertexshader.verticaldrag, 'status').name('Paper simulated Y only').listen().onChange(() => {
      this.setVertexChecked('verticaldrag');
    });
    vertexShader.add(this.state.vertexshader.dragwater, 'status').name('Liquid simulated X/Y axis').listen().onChange(() => {
      this.setVertexChecked('dragwater');
    });
    vertexShader.open();

    const hoverAnimations = this.gui.addFolder('Special Animations (overwrites previous settings)');
    hoverAnimations.add(this.state.hoveranimations, 'none').name('None').listen().onChange(() => {
      this.setHoverChecked('none');
    });
    hoverAnimations.add(this.state.hoveranimations, 'zoom').name('Zoom on mouseover').listen().onChange(() => {
      this.setHoverChecked('zoom');
    });
    hoverAnimations.open();

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

  setFragmentChecked (prop) {
    const {fragmentshader} = this.state;
    for (const param in fragmentshader) {
      if (param) {
        fragmentshader[param].status = prop === param;
      }
    }
    this.setState({fragmentshader});
    this.forceUpdate();
  }

  setVertexChecked (prop) {
    const {vertexshader} = this.state;
    for (const param in vertexshader) {
      if (param) {
        vertexshader[param].status = prop === param;
      }
    }
    this.setState({vertexshader});
    this.forceUpdate();
  }

  setHoverChecked (prop) {
    const {hoveranimations} = this.state;
    for (const param in hoveranimations) {
      if (param) {
        hoveranimations[param] = prop === param;
      }
    }
    this.setState({hoveranimations});
    this.forceUpdate();
  }

  getActiveFragment () {
    const {fragmentshader} = this.state;
    for (const param in fragmentshader) {
      if (fragmentshader[param].status) {
        return fragmentshader[param].ref;
      }
    }

    return '';
  }

  getActiveVertex () {
    const {vertexshader} = this.state;
    for (const param in vertexshader) {
      if (vertexshader[param].status) {
        return vertexshader[param].ref;
      }
    }

    return '';
  }

  getActiveHover () {
    const {hoveranimations} = this.state;
    for (const param in hoveranimations) {
      if (hoveranimations[param]) {
        return param;
      }
    }

    return '';
  }

  render () {
    const {cursorHover, cursorUnhover} = this.props;
    const fragmentShader = this.getActiveFragment();
    const vertexShader = this.getActiveVertex();
    const hoverAnimations = this.getActiveHover();
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
        id='main-page'
        key={`${fragmentShader}-${vertexShader}`}
        ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        { hoverAnimations === 'zoom' &&
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
              vertexShader={vertexShader}
              widthSegments={20}
            >
              <img alt='Test for canvas' src={TestImage} />
            </Plane>
          </Curtains>
        </>}
        { hoverAnimations === 'none' &&
          <>
            <Curtains className={styles['curtains-canvas']}>
              <Plane
                className={styles['curtains-plane']}
                fov={35}
                fragmentShader={fragmentShader}
                heightSegments={20}
                onReady={this.handlePlaneReady}
                onRender={onRender}
                uniforms={dragUniforms}
                vertexShader={vertexShader}
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
