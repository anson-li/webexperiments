import anime from 'animejs';
import {
  gsap, TweenLite, Power4,
} from 'gsap';
import { Tween } from 'gsap/gsap-core';
import {
  SplitText,
} from 'gsap/SplitText';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class SlideInText extends PureComponent {
  constructor (props) {
    super(props);
    this.animatedelements = null;
    this.animatedelementsparent = null;
  }

  componentDidMount () {
    this.props.hideLoader();
    this.props.hideFollow();
    this.animatedelements = new SplitText(this.animatedtext, {
      linesClass: 'inview-split-child',
      type: 'lines',
    });
    this.animatedelementsparent = new SplitText(this.animatedtext, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
    gsap.set(this.animatedtext, {
      perspective: 1500,
    });
    TweenLite.from(this.animatedelements.lines, 1.2, {
      delay: 0.5,
      ease: Power4,
      rotationX: 110,
      stagger: 0.1,
      repeat: -1,
      transformOrigin: '-50% 100px 100px',
      x: '40px',
      y: '400px',
    });

    TweenLite.from(this.animatedelements.lines, 1.2, {
      ease: Power4,
      repeat: -1,
      delay: 0.9,
      opacity: 0,
      stagger: 0.1,
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
          ref={(element) => {
            this.animatedtext = element;
          }}
        >
          <div className={styles['animated-text']}>
            Animated Text
          </div>
          <div className={styles['animated-text']}>
            Animated Text
          </div>
          <div className={styles['animated-text']}>
            Animated Text
          </div>
          <div className={styles['animated-text']}>
            Animated Text
          </div>
          <div className={styles['animated-text']}>
            Animated Text
          </div>
          <div className={styles['animated-text']}>
            Animated Text
          </div>
          <div className={styles['animated-text']}>
            Animated Text
          </div>
          <div className={styles['animated-text']}>
            Animated Text
          </div>
          <div className={styles['animated-text']}>
            Animated Text
          </div>
          <div className={styles['animated-text']}>
            Animated Text
          </div>
          <div className={styles['animated-text']}>
            Animated Text
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
