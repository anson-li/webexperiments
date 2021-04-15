/* eslint-disable react/jsx-no-bind */
import React, {
  PureComponent,
} from 'react';
import {
  Curtains,
} from 'react-curtains';
import SinglePlane from '../SinglePlane';
import './style.scss';

class MultiplePlanes extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      allPlanes: [],
      nbPlanes: 14,
    };
    this.planes = [];
    this.allPlanes = [];
    this.planesDeformations = 0;

    this.handlePlaneReady = this.handlePlaneReady.bind(this);
    this.handleRenderCurtain = this.handleRenderCurtain.bind(this);
    this.setupPlanes = this.setupPlanes.bind(this);
  }

  componentDidMount () {
    this.setupPlanes();
  }

  setupPlanes () {
    const allPlanes = [];
    for (let index = 0; index < this.state.nbPlanes; index++) {
      allPlanes.push(this.buildPlane(index));
    }
    this.setState({allPlanes});
  }

  handleRenderCurtain (curtains) {
    // update our planes deformation
    // increase/decrease the effect
    this.planesDeformations = curtains.lerp(
      this.planesDeformations,
      0,
      0.075,
    );

    // update planes deformations
    this.planes.forEach((plane) => {
      plane.uniforms.planeDeformation.value = this.planesDeformations;
    });
  }

  scrollCurtain (curtains) {
    // get scroll deltas to apply the effect on scroll
    const delta = curtains.getScrollDeltas();

    // invert value for the effect
    delta.y = -delta.y;

    // threshold
    if (delta.y > 60) {
      delta.y = 60;
    } else if (delta.y < -60) {
      delta.y = -60;
    }

    if (Math.abs(delta.y) > Math.abs(this.planesDeformations)) {
      this.planesDeformations = curtains.lerp(
        this.planesDeformations,
        delta.y,
        0.5,
      );
    }
  }

  handlePlaneReady (plane) {
    this.planes.push(plane);
  }

  buildPlane (index) {
    return (
      <SinglePlane index={index} key={index} onPlaneReady={this.handlePlaneReady} />
    );
  }

  render () {
    return (
      <Curtains
        onRender={this.handleRenderCurtain}
        onScroll={this.scrollCurtain.bind(this)}
        pixelRatio={Math.min(1.5, window.devicePixelRatio)}
      >
        <div className='MultiplePlanes'>
          <div className='MultiplePlanes-wrapper'>
            {this.state.allPlanes.map((planeEl) => {
              return planeEl;
            })}
          </div>
        </div>
      </Curtains>
    );
  }
}

export default MultiplePlanes;
