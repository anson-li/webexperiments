import React, { PureComponent } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import { TweenLite } from 'gsap';

import Background from '../../../common/Background';
import withTransition from '../../../common/WithTransition';
import TextLogo from '../../../common/TextLogo';

import './style.scss';

class DinosaurLoader extends PureComponent {
  hidePage() {
    anime.remove(this.el);
    return anime({
      targets: this.el,
      opacity: 0,
      duration: 0,
    }).finished;
  }

  animateIn() {
    anime.remove(this.el);
    return anime({
      targets: this.el,
      opacity: [0, 1],
      duration: 1000,
      delay: 1000,
      easing: 'easeOutExpo',
    }).finished;
  }

  animateOut() {
    anime.remove(this.el);
    const { showLoader } = this.props;
    showLoader();
    return anime({
      targets: this.el,
      opacity: 0,
      duration: 1000,
      easing: 'easeOutExpo',
    }).finished;
  }

  componentDidMount() {
    this.props.hideLoader();
    TweenLite.to(this.dinosaurGradientBase, 2, {
      attr: { offset: "0%" },
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
      ease: "none"
    });
    TweenLite.to(this.dinosaurGradientHighlight, 2, {
      attr: { offset: "0%" },
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
      ease: "none"
    });
  }

  render() {
    const { cursorHover, cursorUnhover } = this.props;
    return (
      <div id="main-page" ref={(e) => { this.el = e; }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <div className="dino-logo">
          <svg
            x="0px"
            y="0px"
            width="224px"
            height="172.029px"
            viewBox="0 0 224 172.029"
          >
            <defs>
              <linearGradient id="dino-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop ref={(e) => { this.dinosaurGradientBase = e; }} offset="100%" stopColor="#CCCCCC"/>
                <stop ref={(e) => { this.dinosaurGradientHighlight = e; }} offset="100%" stopColor="#ffb86f"/>
              </linearGradient>
            </defs>
            <g>
              <path fill="url(#dino-gradient)" d="M140,124.01c0,2.33,0,4.67,0,7c1.67-1.67,3.33-3.33,5-5c0,2.33,0,4.67,0,7c1.33-1.67,2.67-3.33,4-5
                c0.67,0.33,1.33,0.67,2,1c-0.11,4.59-1.71,7.92,1,9c2.84,2.12,3.72,2.53,7,2c1-2.33,2-4.67,3-7c0,0.67,0,1.33,0,2
                c2.03,2.95,2.18,6.08,1,10c2.67-1,5.33-2,8-3c0,2,0,4,0,6c4.9-3.01,6.17-7.15,10-11c0,4.67,0,9.33,0,14c2.33-1.33,4.67-2.67,7-4
                c0.33,1.67,0.67,3.33,1,5c1-0.67,2-1.33,3-2c0.67-1.33,1.33-2.67,2-4c0.33,0,0.67,0,1,0c0.33,2.33,0.67,4.67,1,7
                c1.33-1,2.67-2,4-3c0.33,1.33,0.67,2.67,1,4c1.67-1.33,3.33-2.67,5-4c0,2.33,0,4.67,0,7c-15.07,29.32-47.21,7.46-73,3
                c-19.6-3.39-48.03,1.85-62-8c-19.8-13.96-16.93-48.17-48-52c1.71-5.61,4.76-6.25,8-10c-0.67,0-1.33,0-2,0
                c-5.18-2.95-11.67,0.46-18,2c0-1,0-2,0-3c4.8-7.92,10.26-15.25,11-27c-7.22-10.07-20.54-14.7-22-28c3-5.33,6-10.67,9-16
                c11-8.15,24.28-5.41,32-17c4.33-0.33,8.67-0.67,13-1c25.26-0.37,38.25,9.46,60,15c30.76,7.84,65.27,2.86,89,17
                c12.43,7.41,15.97,22.84,21,38c-4.17,2.77-4.52,2.29-6,8c-2.6-3.86-1.33-4.11-3-4c-0.33,0.67-0.67,1.33-1,2
                c-0.33-1.33-0.67-2.67-1-4c-2.67,1.67-5.33,3.33-8,5c0-1.67,0-3.33,0-5c-0.67,0.33-1.33,0.67-2,1c-1.33,4-2.67,8-4,12
                c-0.67,0-1.33,0-2,0c-0.67-3.67-1.33-7.33-2-11c-0.33,0-0.67,0-1,0c-0.68,4.49-1.53,6.51-4,9c-1.33-3.33-2.67-6.67-4-10
                c-1.33,4.67-2.67,9.33-4,14c-0.67-0.33-1.33-0.67-2-1c-0.33-1.67-0.67-3.33-1-5c0,0.67,0,1.33,0,2c-2.67,4.33-5.33,8.67-8,13
                c-0.67-4.67-1.33-9.33-2-14c-0.33,0-0.67,0-1,0c-1,2-2,4-3,6c-0.67-3-1.33-6-2-9c-0.67,0.33-1.33,0.67-2,1c-2,2.67-4,5.33-6,8
                c0-3,0-6,0-9c-0.67,0.33-1.33,0.67-2,1c-1.42,3.56-1.78,4.21-5,6c0-2.67,0-5.33,0-8c-1.67,1.33-3.33,2.67-5,4
                c-0.33-1.67-0.67-3.33-1-5c-1.67,1.33-3.33,2.67-5,4c0-1.33,0-2.67,0-4c-1.67,1-3.33,2-5,3c0-1.67,0-3.33,0-5
                c-19.43-3.28-49.12-0.35-58,13c25.15-0.93,55.57,20.63,61,39c0.67-0.33,1.33-0.67,2-1C138.94,122.97,137.33,124.97,140,124.01z
                M211,48.01c-0.33-1.67-0.67-3.33-1-5c-8.65-4.89-12.29-10.67-26-11C189.81,39.51,201.75,44.17,211,48.01z M159,46.01
                c0-1.67,0-3.33,0-5c-1.67-0.67-3.33-1.33-5-2c-1,1.33-2,2.67-3,4c0,2.67,0,5.33,0,8C155.66,50.08,156.86,49.33,159,46.01z
                M136,57.01c3.4-4.93,5.63-8.43,8-15c-5.22-11.85-22.09-18.45-38-19c-2.22,6.57-8.22,15.75-5,24
                C105.92,58.07,122.19,60.94,136,57.01z M93,56.01c-2.33-0.67-4.67-1.33-7-2c0-0.33,0-0.67,0-1c3.93-12.15,5.75-22.78,1-35
                c-3-0.33-6-0.67-9-1c-5.23,5.72-7.81,25.77-8,31c8.81,2.28,11.42,6.97,18,11C91.65,57.95,90.94,58.2,93,56.01z M58,67.01
                c5.16-10.32-2.55-40.75-8-49c-1,0-2,0-3,0c-5.33,4-10.67,8-16,12c0,0.67,0,1.33,0,2c1,0.33,2,0.67,3,1c8.57,2.99,13.19,0,17,8
                c-4,8-8,16-12,24c1,1,2,2,3,3C48.29,68.48,54.76,70.04,58,67.01z"/>
            </g>
          </svg>
        </div>
        <Background />
      </div>
    );
  }
}

DinosaurLoader.propTypes = {
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  cursorHover: PropTypes.func.isRequired,
};

export default withTransition(DinosaurLoader);
