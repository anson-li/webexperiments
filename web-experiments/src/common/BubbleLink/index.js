import React, { PureComponent } from 'react';
import { TweenLite } from 'gsap';
import { Link } from 'react-router-dom';
import './style.scss';

class BubbleLink extends PureComponent {
  constructor(props) {
    super(props);
    this.moveLink = this.moveLink.bind(this);
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.hoverLink = this.hoverLink.bind(this);
    this.stopHoverLink = this.stopHoverLink.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }


  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize, false);
    window.addEventListener('mousemove', this.moveLink);
    this.bubbleLink.addEventListener('mouseenter', this.hoverLink);
    this.bubbleLink.addEventListener('mouseleave', this.stopHoverLink);
    TweenLite.to(this.bubbleLink, 0.1, {
      x: this.windowHalfX,
      y: this.windowHalfY,
    });
  }

  hoverLink(e) {
    TweenLite.to(this.bubbleLink, 0.5, {
      background: '#333',
      color: 'white'
    });
  }

  stopHoverLink() {
    TweenLite.to(this.bubbleLink, 0.5, {
      background: 'transparent',
      color: '#333'
    });
  }

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
  }

  moveLink(e) {
    TweenLite.to(this.bubbleLink, 0.7, {
      x: (e.x - this.windowHalfX) / 2 + this.windowHalfX,
      y: (e.y - this.windowHalfY) / 2 + this.windowHalfY,
    });
  }

  render() {
    return (
      <Link
        id="sub-link"
        to="/work"
        href="work"
        ref={(ref) => { this.bubbleLink = ref; }}
      >
        <div id="sub-link-text">
          { this.props.text }
        </div>
      </Link>
    );
  }
}

export default BubbleLink;
