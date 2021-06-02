import {
  TimelineLite, gsap,
} from 'gsap';
import React, {
  PureComponent,
} from 'react';
import Logo from '../../web/assets/logo_flat.png';
import './style.scss';

class Loader extends PureComponent {
  constructor (props) {
    super(props);
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.tl = new TimelineLite();
  }

  fadeIn () {
    console.log('fading in');
    gsap.killTweensOf(this.loader);
    this.tl.set(this.loader, {
      y: window.innerHeight,
    }).to(this.loader, 1, {
      y: 0,
    });
  }

  fadeOut () {
    console.log('fading out');
    gsap.killTweensOf(this.loader);
    this.tl.to(this.loader, 1, {
      y: -window.innerHeight,
    }).set(this.loader, {
      y: window.innerHeight,
    });
  }

  render () {
    return (
      <div
        id='loader-wrapper' ref={(ref) => {
          this.loader = ref;
        }}>
        <div id='loader' />
        <img alt='Loader logo' className='loader-img' src={Logo} />
        <div className='loader-section section-left' />
        <div className='loader-section section-right' />
        {/* <div id="bottom" className="loader-bottom" /> */}
      </div>
    );
  }
}

export default Loader;
