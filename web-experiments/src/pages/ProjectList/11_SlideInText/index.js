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
import SmoothScroll from '../../../common/SmoothScroll';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import GridBackground from './Images/pixelgrid.png';
import Header from './components/Header';
import HeroText from './components/HeroText';
import HorizontalSlidingText from './components/HorizontalSlidingText';
import MultipleImageGallery from './components/MultipleImageGallery';
import SingleImageDescription from './components/SingleImageDescription';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class SlideInText extends PureComponent {
  componentDidMount () {
    this.animateIn();
  }

  animateIn () {
    this.props.hideLoader();
    this.props.hideFollow();
    gsap.to(this.el, 1, {
      delay: 1,
      opacity: 1,
    });
  }

  animateOut () {
    this.props.showFollow();
    this.props.showLoader();
    gsap.to(this.el, 1, {
      opacity: 0,
    });
  }

  render () {
    const {cursorHover, cursorUnhover, transitionStatus} = this.props;

    return (
      <div
        className={`${styles['slidein-background']} ${transitionStatus}`}
        id='generative-art'
        ref={(element) => {
          this.el = element;
        }}>
        <SmoothScroll>
          <TextLogo
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          <Header />
          <div
            className={styles['page-content']}
            style={{backgroundImage: `url(${GridBackground})`}}>
            <HeroText />
            <SingleImageDescription />
            <HorizontalSlidingText />
            <MultipleImageGallery />
          </div>
        </SmoothScroll>
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
  transitionStatus: PropTypes.string.isRequired,
};

export default WithTransition(SlideInText);
