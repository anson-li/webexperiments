import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Curtains, Plane,
} from 'react-curtains';
import DitheringFs from './DitheringFs';
import DragVs from './DragVs';
import styles from './style.module.scss';

class DitheredImage extends PureComponent {
  constructor (props) {
    super(props);
    this.handleMovement = this.handleMovement.bind(this);
    this.handlePlaneReady = this.handlePlaneReady.bind(this);
    this.mousePosition = {
      x: 0,
      y: 0,
    };
    this.progress = 0;
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.handleMovement);
    window.removeEventListener('touchmove', this.handleMovement);
  }

  handlePlaneReady (plane) {
    window.addEventListener('mousemove', (event) => {
      this.handleMovement(event, plane);
    });
    window.addEventListener('touchmove', (event) => {
      this.handleMovement(event, plane);
    });
    window.addEventListener('scroll', (event) => {
      this.handleMovement(event, plane);
    });
  }

  handleMovement (event, plane) {
    if (event.targetTouches) {
      // touch event
      this.mousePosition.x = event.targetTouches[0].clientX;
      this.mousePosition.y = event.targetTouches[0].clientY;
    } else if (event.clientX && event.clientY) {
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

    return (
      <Curtains className={styles['curtains-canvas']}>
        <Plane
          className={styles['curtains-plane']}
          fov={35}
          fragmentShader={DitheringFs}
          heightSegments={20}
          onReady={this.handlePlaneReady}
          onRender={onRender}
          uniforms={dragUniforms}
          vertexShader={DragVs}
          widthSegments={20}
        >
          <img alt='Test for canvas' src={this.props.image} />
        </Plane>
      </Curtains>
    );
  }
}

DitheredImage.propTypes = {
  image: PropTypes.string.isRequired,

};

export default DitheredImage;
