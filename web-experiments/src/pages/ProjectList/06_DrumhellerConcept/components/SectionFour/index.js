import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  InView,
} from 'react-intersection-observer';
import ImageThreeOne from '../Images/section-3-1.jpg';
import ImageThreeTwo from '../Images/section-3-2.jpg';
import ImageThreeThree from '../Images/section-3-3.jpg';
import MainBanner from '../MainBanner';
import styles from './style.module.scss';

class SectionFour extends PureComponent {
  componentDidUpdate () {
    const {timeline, scrollDistance} = this.props;
    if (timeline) {
      timeline.to(this.topone, {duration: 30,
        x: -scrollDistance * 0.03}, 70);
      timeline.to(this.bottomone, {duration: 30,
        x: -scrollDistance * 0.02}, 70);
      timeline.to(this.toptwo, {duration: 30,
        x: -scrollDistance * 0.03}, 70);
      timeline.to(this.bottomtwo, {duration: 30,
        x: -scrollDistance * 0.02}, 70);
    }
  }

  render () {
    const {animateInDiv, validateImagesLoaded} = this.props;

    return (
      <div className={`${styles['drumheller-section']} ${styles.four}`}>
        <div className={styles['drumheller-section-four']}>
          <MainBanner
            animateInDiv={animateInDiv}
            description='We foster an environment of learning and development for future generations.'
            id='03'
            image={ImageThreeOne}
            imageAlt='Dinosaur!'
            imageHint='Inspiring creativity'
            title='Our Future'
            validateImagesLoaded={validateImagesLoaded}
          />
          <div className={styles['top-image-title']}>
            <div
              className={styles['top-image']} ref={(element) => {
                this.topone = element;
              }}>
              <img alt='Dinosaur?' onLoad={validateImagesLoaded()} src={ImageThreeTwo} />
            </div>
            <div ref={(element) => {
              this.bottomone = element;
            }}>
              <InView
                as='div' className={styles['lower-text']} delay={100}
                onChange={(inView, entry) => {
                  return animateInDiv(inView, entry);
                }} triggerOnce>
                New discoveries are made<br />everyday, thanks to the<br />great work at Tyrrell.
              </InView>
            </div>
          </div>
          <div className={styles['bottom-image-section']}>
            <div
              className={styles['upper-text']} ref={(element) => {
                this.toptwo = element;
              }}>
              <InView
                as='div' className={styles['panel-left']} delay={100}
                onChange={(inView, entry) => {
                  return animateInDiv(inView, entry);
                }} triggerOnce>
                Every year, new discoveries are made at the<br />
                Royal Tyrrell Museum that change the landscape of<br />
                the world of Palaeontology. Most recently, researchers<br />
                have discovered a brand new Tyrannosaurus species;<br />
                the first in 50 years.
              </InView>
              <InView
                as='div' className={styles['panel-right']} delay={100}
                onChange={(inView, entry) => {
                  return animateInDiv(inView, entry);
                }} triggerOnce>
                Additionally, the Royal Tyrrell offers an interactive<br />
                space, where people take part in interactive displays<br />
                to learn about how the dinosaur ate, moved and<br />
                interacted with other organisms in its environment.
              </InView>
            </div>
            <div
              className={styles['bottom-image']} ref={(element) => {
                this.bottomtwo = element;
              }}>
              <img alt='Dinosaur!' onLoad={validateImagesLoaded()} src={ImageThreeThree} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SectionFour.propTypes = {
  animateInDiv: PropTypes.func,
  scrollDistance: PropTypes.number,
  timeline: PropTypes.shape({
    to: PropTypes.func.isRequired,
  }),
  validateImagesLoaded: PropTypes.func,
};

SectionFour.defaultProps = {
  scrollDistance: null,
  timeline: null,
};

export default SectionFour;
