/* eslint-disable radix */
/* eslint-disable react/jsx-no-bind */
import {
  TweenLite, Power0, Power4, gsap,
} from 'gsap';
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
      nbPlanes: 48,
    };
    this.planes = [];
    this.allPlanes = [];
    this.curtain = null;
    this.planesDeformations = 0;
    this.previousY = 0;
    this.scroll = 0;

    this.handlePlaneReady = this.handlePlaneReady.bind(this);
    this.setupPlanes = this.setupPlanes.bind(this);
    this.handleSetupCurtain = this.handleSetupCurtain.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount () {
    this.setupPlanes();
  }

  handleScroll (event) {
    // console.log(event.target.scrollLeft);
    // console.log(event.target.scrollTop);
    // this.updateScroll(event.target.scrollLeft, event.target.scrollTop);
    TweenLite.to(this, 1, {
      ease: Power0,
      onUpdate: () => {
        this.updateScroll(0, this.scroll);
      },
      scroll: event.target.scrollTop,
    });
  }

  setupPlanes () {
    const allPlanes = [];
    for (let index = 0; index < this.state.nbPlanes; index++) {
      allPlanes.push(this.buildPlane(index));
    }
    this.setState({allPlanes});
  }

  scrollCurtain (curtains) {
    // get scroll deltas to apply the effect on scroll
    const delta = curtains.getScrollDeltas();

    // invert value for the effect
    delta.y = -delta.y;

    // threshold
    if (delta.y > 10) {
      delta.y = 10;
    } else if (delta.y < -10) {
      delta.y = -10;
    }

    this.planesDeformations = curtains.lerp(Math.abs(this.planesDeformations), Math.abs(delta.y) * 1.5, 1);

    this.planes.forEach((plane) => {
      plane.uniforms.planeDeformation.value =
      Math.abs(this.planesDeformations) * (plane._boundingRect.document.top - window.innerHeight / 2) / (window.innerHeight / 2);

      plane.uniforms.planePosition.value =
        1 - Math.abs(Math.min(Math.max(plane._boundingRect.document.top, 0), window.innerHeight) - window.innerHeight / 2) / (window.innerHeight / 2);

      plane.uniforms.planeVelocity.value = Math.min(Math.max(Math.abs(this.planesDeformations), 0), 10);
    });
  }

  handlePlaneReady (plane) {
    this.planes.push(plane);
  }

  buildPlane (index) {
    return (
      <SinglePlane index={index} key={index} onPlaneReady={this.handlePlaneReady} />
    );
  }

  updateScroll (xOffset, yOffset) {
    // update our scroll manager values
    if (this.curtain) {
      this.curtain.updateScrollValues(xOffset, yOffset);
      this.curtain.needRender();
    }
  }

  handleSetupCurtain (curtain) {
    curtain.disableDrawing();
    this.curtain = curtain;
  }

  render () {
    return (
      <div
        className='viewport'
        ref={(e) => {
          this.curtainsref = e;
        }}
        style={{height: window.innerHeight}}
      >
        <Curtains
          onScroll={this.scrollCurtain.bind(this)}
          onSuccess={this.handleSetupCurtain}
          pixelRatio={Math.min(1.5, window.devicePixelRatio)}
        >
          <div
            className='MultiplePlanes'
            onScroll={this.handleScroll}
            ref={(e) => {
              this.planesref = e;
            }}
          >
            <div
              className='MultiplePlanes-wrapper'
            >
              {this.state.allPlanes.map((planeEl) => {
                return planeEl;
              })}
            </div>
          </div>
        </Curtains>
      </div>
    );
  }
}

export default MultiplePlanes;
