import anime from 'animejs';
import {
  gsap, Power4,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import GridBackground from './Images/pixelgrid.png';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class SlideInText extends PureComponent {
  constructor (props) {
    super(props);
    this.animatedelements = null;
    this.animatedelementsdescription = null;
  }

  componentDidMount () {
    this.props.hideLoader();
    this.props.hideFollow();
    this.animatedelements = new SplitText(this.animatedtitle, {
      type: 'chars',
    });

    // Template for rolling items up into the page
    gsap.set(this.animatedtitle, {
      perspective: '600px',
      perspectiveOrigin: '300px',
      transformOrigin: 'center',
      scale: 0.5,
      x: -335,
    });
    gsap.set(this.animatedelements.chars, {
      backfaceVisibility: 'hidden',
      z: 300,
    });
    gsap.from(this.animatedelements.chars, 0.7, {
      delay: 1,
      ease: Power4,
      opacity: 0,
      rotationX: '90',
      stagger: 0.1,
      transformOrigin: '50% 50% 50px',
    });

    // Template for rolling images up into the page
    gsap.set(this.animatedimage, {
      perspective: '1000px',
      perspectiveOrigin: '300px',
      transformOrigin: 'center',
    });
    gsap.set(this.animatedinnerimage, {
      backfaceVisibility: 'hidden',
      backgroundPosition: 'center',
      backgroundSize: '100% 100%',
      scale: 0.7,
      z: 300,
    });
    gsap.from(this.animatedinnerimage, 0.7, {
      backgroundSize: '200% 200%',
      delay: 1.5,
      ease: Power4,
      filter: 'grayscale(100%)',
      opacity: 0,
      rotationX: '90',
      stagger: 0.1,
      transformOrigin: '50% 50% 100px',
    });
  }

  hidePage () {
    anime.remove(this.el);

    return anime({
      duration: 0,
      opacity: 0,
      targets: this.el,
    }).finished;
  }

  animateIn () {
    anime.remove(this.el);

    return anime({
      delay: 1000,
      duration: 1000,
      easing: 'easeOutExpo',
      opacity: [0, 1],
      targets: this.el,
    }).finished;
  }

  animateOut () {
    anime.remove(this.el);
    this.props.showFollow();
    const {showLoader} = this.props;
    showLoader();

    return anime({
      duration: 1000,
      easing: 'easeOutExpo',
      opacity: 0,
      targets: this.el,
    }).finished;
  }

  render () {
    const {cursorHover, cursorUnhover} = this.props;

    return (
      <div
        className={styles['slidein-background']}
        id='generative-art'
        ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <div
          className={styles['page-content']}
          style={{backgroundImage: `url(${GridBackground})`}}>
          <div className={styles['animated-text-template']}>
            TEXT.
          </div>
          <div
            className={styles['animated-text']}
            ref={(element) => {
              this.animatedtitle = element;
            }}>
            TEXT.
          </div>
          <div
            className={styles['animated-box']} />
          <div
            className={styles['animated-image']}
            ref={(element) => {
              this.animatedimage = element;
            }}>
            <div
              className={styles['animated-inner-image']}
              ref={(element) => {
                this.animatedinnerimage = element;
              }}
              style={{backgroundImage: 'url(https://unsplash.it/1920/1080?random=1)'}} />
          </div>
        </div>
      </div>
    );
  }
}

SlideInText.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideFollow: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showFollow: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

export default WithTransition(SlideInText);
