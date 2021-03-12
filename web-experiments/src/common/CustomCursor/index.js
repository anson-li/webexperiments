import React, { PureComponent } from 'react';
import { TweenLite } from 'gsap';

import './style.scss';
import { Tween } from 'gsap/gsap-core';

class CustomCursor extends PureComponent {
  constructor(props) {
    super(props);
    this.moveCircle = this.moveCircle.bind(this);
    this.hoverFunc = this.hoverFunc.bind(this);
    this.unhoverFunc = this.unhoverFunc.bind(this);
    this.hideFollow = this.hideFollow.bind(this);
    this.showFollow = this.showFollow.bind(this);
    this.circleTween = null;
    this.followTween = null;
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.moveCircle);
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('onmouseover', this.hoverFunc);
    window.addEventListener('onmouseout', this.unhoverFunc);
  }

  moveCircle(e) {
    TweenLite.to(this.circle, 0.2, {
      x: e.x,
      y: e.y,
    });
    TweenLite.to(this.follow, 0.7, {
      x: e.x,
      y: e.y,
    });
  }

  hoverFunc(e) {
    TweenLite.to(this.circle, 0.3, {
      opacity: 1,
      scale: 0,
    });
    TweenLite.to(this.follow, 0.3, {
      scale: 2,
      borderColor: '#333',
    });
  }

  hideFollow() {
    TweenLite.to(this.circle, 0.3, {
      opacity: 1,
      scale: 1,
    });
    TweenLite.to(this.follow, 0.3, {
      scale: 0,
    });
  }

  showFollow() {
    TweenLite.to(this.follow, 0.3, {
      scale: 1,
    })
  }

  unhoverFunc(e) {
    TweenLite.to(this.circle, 0.3, {
      opacity: 1,
      scale: 1,
    });
    TweenLite.to(this.follow, 0.3, {
      scale: 1,
      borderColor: '#333',
    });
  }

  onScroll(e) {
    TweenLite.to(this.circle, 0.2, {
      x: e.x,
      y: e.y,
    });
    TweenLite.to(this.follow, 0.7, {
      x: e.x,
      y: e.y,
    });
  }

  render() {
    return (
      <>
        <div className="cursor-circle" ref={(ref) => { this.circle = ref; }} />
        <div className="cursor-circle-follow" ref={(ref) => { this.follow = ref; }} />
        <div className="cursor-circle-name" ref={(ref) => { this.list = ref; }} />
      </>
    );
  }
}

export default CustomCursor;
