import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  InView,
} from 'react-intersection-observer';
import ImageTwoOne from '../Images/section-2-1.jpg';
import ImageTwoTwo from '../Images/section-2-2.jpg';
import ImageTwoThree from '../Images/section-2-3.jpg';
import MainBanner from '../MainBanner';
import styles from './style.module.scss';

class SectionThree extends PureComponent {
  componentDidUpdate () {
    const {timeline, scrollDistance} = this.props;
    if (timeline) {
      timeline.to(this.topone, {duration: 35,
        x: -scrollDistance * 0.03 + 600}, 45);
      timeline.to(this.bottomone, {duration: 35,
        x: -scrollDistance * 0.02 + 600}, 45);
      timeline.to(this.toptwo, {duration: 35,
        x: -scrollDistance * 0.03 + 600}, 45);
      timeline.to(this.bottomtwo, {duration: 35,
        x: -scrollDistance * 0.02 + 600}, 45);
    }
  }

  render () {
    const {validateImagesLoaded, animateInDiv} = this.props;

    return (
      <div className={`${styles['drumheller-section']} ${styles.three}`}>
        <div className={styles['drumheller-section-three']}>
          <MainBanner
            animateInDiv={animateInDiv}
            description='Established in 1985, we celebrate the 3.9 billion year history of life on Earth.'
            id='02'
            image={ImageTwoOne}
            imageAlt='Gorgosaurus!'
            imageHint='A Gorgosaurus fossil'
            title='Our Past'
            validateImagesLoaded={validateImagesLoaded}
          />
          <div className={styles['bottom-image-title']}>
            <div ref={(element) => {
              this.topone = element;
            }}>
              <InView
                as='div' className={styles['upper-text']} delay={100}
                onChange={(inView, entry) => {
                  return animateInDiv(inView, entry);
                }} triggerOnce>
                In 1884, Joseph B. Tyrrell<br />stumbled upon a 70 million<br />year-old dinosaur skull.
              </InView>
            </div>
            <div
              className={styles['bottom-image']} ref={(element) => {
                this.bottomone = element;
              }}>
              <img alt='Fossils!' onLoad={validateImagesLoaded()} src={ImageTwoTwo} />
            </div>
          </div>
          <div className={styles['top-image-description']}>
            <div
              className={styles['top-image']} ref={(element) => {
                this.toptwo = element;
              }}>
              <img alt='Gorgosaurus!' onLoad={validateImagesLoaded()} src={ImageTwoThree} />
            </div>
            <div
              className={styles['lower-text']} ref={(element) => {
                this.bottomtwo = element;
              }}>
              <InView
                as='div' className={styles['paragraph-spacing']} delay={100}
                onChange={(inView, entry) => {
                  return animateInDiv(inView, entry);
                }} triggerOnce>
                The young geologist stumbled upon the treasure deep in the heart of Alberta’s Badlands.<br />
                The carnivorous dinosaur, the first of its species ever found, was later named Albertosaurus Sarcophagus.
              </InView>
              <InView
                as='div' className={styles['paragraph-spacing']} delay={500}
                onChange={(inView, entry) => {
                  return animateInDiv(inView, entry);
                }} triggerOnce>
                The excavations continued after Tyrrell’s find – in 1910 American palaeontologist, Barnum Brown,<br />
                from the American Museum of Natural History in New York City, visited the area and over a period<br />
                of five years removed 16 dinosaur specimens, some that were new discoveries.
              </InView>
              <InView
                as='div' delay={1000} onChange={(inView, entry) => {
                  return animateInDiv(inView, entry);
                }}
                triggerOnce>
                When the Museum opened in 1985 it was called the Tyrrell Museum of Palaeontology,<br />
                commemorating Joseph Burr Tyrrell. In 1990, the Museum was granted the &quot;Royal&quot; appellation by<br />
                Her Majesty Queen Elizabeth II. While the Museum is now officially the Royal Tyrrell Museum<br />
                of Palaeontology, it&rsquo;s most often referred to as the Royal Tyrrell Museum.
              </InView>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SectionThree.propTypes = {
  animateInDiv: PropTypes.func,
  scrollDistance: PropTypes.number,
  timeline: PropTypes.shape({
    to: PropTypes.func.isRequired,
  }),
  validateImagesLoaded: PropTypes.func,
};

SectionThree.defaultProps = {
  scrollDistance: null,
  timeline: null,
};

export default SectionThree;
