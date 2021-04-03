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
    if (this.props.timeline) {
      this.props.timeline.to(this.topone, { x: -this.props.scrollDistance * 0.03 + 600,
        duration: 35 }, 45);
      this.props.timeline.to(this.bottomone, { x: -this.props.scrollDistance * 0.02 + 600,
        duration: 35 }, 45);
      this.props.timeline.to(this.toptwo, { x: -this.props.scrollDistance * 0.03 + 600,
        duration: 35 }, 45);
      this.props.timeline.to(this.bottomtwo, { x: -this.props.scrollDistance * 0.02 + 600,
        duration: 35 }, 45);
    }
  }

  render () {
    const { validateImagesLoaded } = this.props;

    return (
      <div className={`${styles['drumheller-section']} ${styles.three}`}>
        <div className={styles['drumheller-section-three']}>
          <MainBanner
            animateInDiv={this.props.animateInDiv}
            description='Established in 1985, we celebrate the 3.9 billion year history of life on Earth.'
            id='02'
            image={ImageTwoOne}
            imageAlt='Gorgosaurus!'
            imageHint='A Gorgosaurus fossil'
            title='Our Past'
            validateImagesLoaded={validateImagesLoaded}
          />
          <div className={styles['bottom-image-title']}>
            <div ref={(e) => {
              this.topone = e;
            }}>
              <InView
                as='div' className={styles['upper-text']} delay={100}
                onChange={(inView, entry) => {
                  return this.props.animateInDiv(inView, entry);
                }} triggerOnce>
                In 1884, Joseph B. Tyrrell<br />stumbled upon a 70 million<br />year-old dinosaur skull.
              </InView>
            </div>
            <div
              className={styles['bottom-image']} ref={(e) => {
                this.bottomone = e;
              }}>
              <img alt='Fossils!' onLoad={validateImagesLoaded()} src={ImageTwoTwo} />
            </div>
          </div>
          <div className={styles['top-image-description']}>
            <div
              className={styles['top-image']} ref={(e) => {
                this.toptwo = e;
              }}>
              <img alt='Gorgosaurus!' onLoad={validateImagesLoaded()} src={ImageTwoThree} />
            </div>
            <div
              className={styles['lower-text']} ref={(e) => {
                this.bottomtwo = e;
              }}>
              <InView
                as='div' className={styles['paragraph-spacing']} delay={100}
                onChange={(inView, entry) => {
                  return this.props.animateInDiv(inView, entry);
                }} triggerOnce>
                The young geologist stumbled upon the treasure deep in the heart of Alberta’s Badlands.<br />
                The carnivorous dinosaur, the first of its species ever found, was later named Albertosaurus Sarcophagus.
              </InView>
              <InView
                as='div' className={styles['paragraph-spacing']} delay={500}
                onChange={(inView, entry) => {
                  return this.props.animateInDiv(inView, entry);
                }} triggerOnce>
                The excavations continued after Tyrrell’s find – in 1910 American palaeontologist, Barnum Brown,<br />
                from the American Museum of Natural History in New York City, visited the area and over a period<br />
                of five years removed 16 dinosaur specimens, some that were new discoveries.
              </InView>
              <InView
                as='div' delay={1000} onChange={(inView, entry) => {
                  return this.props.animateInDiv(inView, entry);
                }}
                triggerOnce>
                When the Museum opened in 1985 it was called the Tyrrell Museum of Palaeontology,<br />
                commemorating Joseph Burr Tyrrell. In 1990, the Museum was granted the "Royal" appellation by<br />
                Her Majesty Queen Elizabeth II. While the Museum is now officially the Royal Tyrrell Museum<br />
                of Palaeontology, it's most often referred to as the Royal Tyrrell Museum.
              </InView>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SectionThree;
