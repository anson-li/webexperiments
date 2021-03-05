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
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.moveLink);
  }

  moveLink(e) {
    TweenLite.to(this.bubbleLink, 0.7, {
      x: (e.x - this.windowHalfX) / 2 + this.windowHalfX,
      y: (e.y - this.windowHalfY) / 2 + this.windowHalfY,
    });
  }

  render() {
    return (
      <Link id="sub-link" to="/work" href="work" ref={(ref) => { this.bubbleLink = ref; }}>
        <div id="sub-link-text">
          { this.props.text }
        </div>
      </Link>
    );
  }
}

export default BubbleLink;
