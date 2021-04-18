import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Plane,
} from 'react-curtains';
import FragmentShader from '../../Shaders/FragmentShader';
import VertexShader from '../../Shaders/VertexShader';
import './style.scss';

class SinglePlane extends PureComponent {
  constructor (props) {
    super(props);
    this.uniforms = {
      fullscreenTransition: {
        name: 'uTransition',
        type: '1f',
        value: 0,
      },
      hoverProgress: {
        name: 'uHoverProgress',
        type: '1f',
        value: 0,
      },
      mousePosition: {
        name: 'uMousePosition',
        type: '2f',
        value: [0, 0],
      },
      planeDeformation: {
        name: 'uPlaneDeformation',
        type: '1f',
        value: 0,
      },
      planeLostFocusDepth: {
        name: 'uPlaneLostFocusDepth',
        type: '1f',
        value: 0,
      },
      planePosition: {
        name: 'uPlanePosition',
        type: '1f',
        value: 0,
      },
      planeVelocity: {
        name: 'uPlaneVelocity',
        type: '1f',
        value: 0,
      },
      time: {
        name: 'uTime',
        type: '1f',
        value: 0,
      },
    };
    this.drawCheckMargins = {
      bottom: 100,
      left: 0,
      right: 0,
      top: 100,
    };
    this.imageIndex = this.props.index % 4 + 1;
  }

  render () {
    return (
      <div className='MultiplePlanes-element'>
        <div className='MultiplePlanes-element-inner'>
          <div className='MultiplePlanes-landscape'>
            <div className='MultiplePlanes-landscape-inner'>
              <Plane
                className='MultiplePlanes-plane'
                drawCheckMargins={this.drawCheckMargins}
                fragmentShader={FragmentShader}
                heightSegments={10}
                onReady={this.props.onPlaneReady}
                uniforms={this.uniforms}
                vertexShader={VertexShader}
                widthSegments={10}
              >
                <img
                  alt=''
                  src={'https://unsplash.it/1920/1080?random=' + this.imageIndex}
                />
              </Plane>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SinglePlane.propTypes = {
  index: PropTypes.number,
  onPlaneReady: PropTypes.func,
};

SinglePlane.defaultProps = {
  index: 1,
  onPlaneReady: () => {},
};

export default SinglePlane;
