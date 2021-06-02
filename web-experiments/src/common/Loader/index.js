import {
  TweenLite, gsap,
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
  }

  fadeIn () {
    console.log('fading in');
    gsap.killTweensOf(this.loader);
    TweenLite.to(this.loader, 1, {
      opacity: 1,
      zIndex: 5,
    });
  }

  fadeOut () {
    console.log('fading out');
    gsap.killTweensOf(this.loader);
    TweenLite.to(this.loader, 1, {
      opacity: 0,
      zIndex: -1,
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
