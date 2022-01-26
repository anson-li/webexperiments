import {
  gsap,
} from 'gsap';
import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger';
import {
  SplitText,
} from 'gsap/SplitText';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import SmoothScroll from '../../../common/SmoothScroll';
import TextLogo from '../../../common/TextLogo';
import GridBackground from './Images/pixelgrid.png';
import Header from './components/Header';
import HeroText from './components/HeroText';
import HorizontalSlidingText from './components/HorizontalSlidingText';
import MultipleImageGallery from './components/MultipleImageGallery';
import SingleImageDescription from './components/SingleImageDescription';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

class DiagonalAnimated extends PureComponent {
  constructor (props) {
    super(props);
    this.timeline = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
      },
    });
  }

  componentDidMount () {
    ScrollTrigger.refresh();
  }

  render () {
    const {cursorHover, cursorUnhover} = this.props;

    return (
      <div
        className={`${styles['slidein-background']}`}
        id='generative-art'
        ref={(element) => {
          this.el = element;
        }}>
        <SmoothScroll>
          <TextLogo
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          <Header timeline={this.timeline} />
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

DiagonalAnimated.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
};

export default DiagonalAnimated;
