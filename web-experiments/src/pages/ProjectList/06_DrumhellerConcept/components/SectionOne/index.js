import {
  gsap, Power4,
} from 'gsap';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import ImageIntroOne from '../Images/intro-1.jpg';
import ImageIntroTwo from '../Images/intro-2.jpg';
import Underline from '../Images/underline.png';
import styles from './style.module.scss';

class SectionOne extends PureComponent {
  constructor (props) {
    super(props);
    this.drawUnderline = this.drawUnderline.bind(this);
    this.tl = null;
  }

  componentDidUpdate () {
    const {timeline, scrollDistance} = this.props;
    if (timeline) {
      timeline.to(this.imageone, {duration: 100,
        x: -scrollDistance * 0.12}, 0);
      timeline.to(this.imagetwo, {duration: 100,
        x: -scrollDistance * 0.1}, 0);
      timeline.to(this.titleitalic, {duration: 100,
        x: -scrollDistance * 0.15}, 0);
    }
  }

  drawUnderline () {
    if (!this.tl || !this.tl.isActive()) {
      this.tl = gsap.timeline()
        .from(this.underline, 1.5, {
          clipPath: 'inset(0% 100% 0% 0%)',
          delay: 1,
          ease: Power4,
        });
      this.tl.play();
    }
  }

  render () {
    const {validateImagesLoaded} = this.props;

    return (
      <div className={styles['drumheller-section-one']}>
        <div className={styles['drumheller-textblock']}>
          <div className={styles.text}>
            <div className={styles.primary}>
              Our Story
            </div>
            <div
              className={styles.secondary} ref={(element) => {
                this.titleitalic = element;
              }}>
              <span className={styles['drumheller-italic']}>at</span>&nbsp;
              <span className={styles['drumheller-outline']}>
                Tyrrell
                <span
                  className={styles['custom-underline']} ref={(element) => {
                    this.underline = element;
                  }}>
                  <img alt='Underline' src={Underline} />
                </span>
              </span>
            </div>
          </div>
          <div className={styles.description}>
            Set in the rugged Alberta badlands, the Royal Tyrrell<br />
            Museum of Palaeontology displays one of the world&rsquo;s<br />
            largest collections of dinosaurs.<br /><br />

            With ever-changing exhibits and self-guided experiences<br />
            year-round, there is always something new to discover.
          </div>
        </div>
        <div
          className={`${styles['image-block']} ${styles['drumheller-imageblock-two']}`} ref={(element) => {
            this.imagetwo = element;
          }}>
          <img alt='Skeleton!' onLoad={validateImagesLoaded()} src={ImageIntroTwo} />
          <div className={styles['image-block-description']}>Tyrannosaurus Rex Skeleton</div>
        </div>
        <div
          className={`${styles['image-block']} ${styles['drumheller-imageblock-one']}`} ref={(element) => {
            this.imageone = element;
          }}>
          <img alt='Dinosaurs!' onLoad={validateImagesLoaded()} src={ImageIntroOne} />
          <div className={styles['image-block-description']}>Dinosaurs Recreated for Today</div>
        </div>
      </div>
    );
  }
}

SectionOne.propTypes = {
  scrollDistance: PropTypes.number,
  timeline: PropTypes.shape({
    to: PropTypes.func.isRequired,
  }),
  validateImagesLoaded: PropTypes.func,
};

SectionOne.defaultProps = {
  scrollDistance: null,
  timeline: null,
};

export default SectionOne;
