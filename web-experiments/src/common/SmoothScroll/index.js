import {
  TweenLite, Power4,
} from 'gsap';
import PropTypes from 'prop-types';
import React from 'react';
import WOW from 'wowjs';

import './style.scss';

class SmoothScroll extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: window.innerHeight,
    };
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll);
    this.ro.observe(this.viewport);
    const {height} = this.state;
    new WOW.WOW({
      animateClass: 'animated',
      boxClass: 'wow',
      live: false,
      mobile: true,
      offset: height - 500,
    }).init();
    this.el = null;
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll);
    this.ro.disconnect();
  }

  ro = new ResizeObserver((elements) => {
    for (const elem of elements) {
      const crx = elem.contentRect;
      this.setState({
        height: crx.height,
      });
    }
  });

  onScroll = () => {
    TweenLite.to(this.viewport, 0.5, {
      ease: Power4,
      force3D: true,
      rotationY: 0.01,
      y: -window.pageYOffset,
    });
  };

  render () {
    const {children} = this.props;
    const {height} = this.state;

    return (
      <>
        <div
          className='viewport' ref={(ref) => {
            this.viewport = ref;
          }}>
          {children}
        </div>
        <div
          ref={(ref) => {
            this.fake = ref;
          }}
          style={{
            height,
          }}
        />
      </>
    );
  }
}

SmoothScroll.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SmoothScroll;
