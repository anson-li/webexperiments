import {
  TweenLite,
} from 'gsap';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Link,
} from 'react-router-dom';
import './style.scss';

class BubbleLink extends PureComponent {
  constructor (props) {
    super(props);
    this.moveLink = this.moveLink.bind(this);
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.hoverLink = this.hoverLink.bind(this);
    this.stopHoverLink = this.stopHoverLink.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount () {
    window.addEventListener('resize', this.onWindowResize, false);
    window.addEventListener('mousemove', this.moveLink);
    this.bubbleLink.addEventListener('mouseenter', this.hoverLink);
    this.bubbleLink.addEventListener('mouseleave', this.stopHoverLink);
    TweenLite.to(this.bubbleLink, 0.1, {
      x: this.windowHalfX,
      y: this.windowHalfY,
    });
  }

  hoverLink () {
    if (this.bubbleLink) {
      TweenLite.to(this.bubbleLink, 0.5, {
        background: '#333',
        color: 'white',
      });
    }
  }

  stopHoverLink () {
    if (this.bubbleLink) {
      TweenLite.to(this.bubbleLink, 0.5, {
        background: 'transparent',
        color: '#333',
      });
    }
  }

  onWindowResize () {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
  }

  moveLink (event) {
    if (this.bubbleLink) {
      TweenLite.to(this.bubbleLink, 0.7, {
        x: (event.x - this.windowHalfX) / 2 + this.windowHalfX,
        y: (event.y - this.windowHalfY) / 2 + this.windowHalfY,
      });
    }
  }

  render () {
    const {text} = this.props;

    return (
      <Link
        href='work'
        id='sub-link'
        ref={(ref) => {
          this.bubbleLink = ref;
        }}
        to='/work'
      >
        <div id='sub-link-text'>
          { text }
        </div>
      </Link>
    );
  }
}

BubbleLink.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BubbleLink;
