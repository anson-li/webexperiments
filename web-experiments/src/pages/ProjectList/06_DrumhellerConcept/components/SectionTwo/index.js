import React, {
  PureComponent,
} from 'react';
import {
  InView,
} from 'react-intersection-observer';
import ImageOneOne from '../Images/section-1-1.jpg';
import VideoOneTwo from '../Images/section-1-2.mp4';
import ImageOneThree from '../Images/section-1-3.jpg';
import MainBanner from '../MainBanner';
import styles from './style.module.scss';

class SectionTwo extends PureComponent {
  componentDidUpdate () {
    if (this.props.timeline) {
      this.props.timeline.to(this.topone, {duration: 30,
        x: -this.props.scrollDistance * 0.03 + 300}, 18);
      this.props.timeline.to(this.bottomone, {duration: 30,
        x: -this.props.scrollDistance * 0.02 + 300}, 18);
      this.props.timeline.to(this.toptwo, {duration: 30,
        x: -this.props.scrollDistance * 0.01 + 300}, 18);
      this.props.timeline.to(this.bottomtwo, {duration: 30,
        x: -this.props.scrollDistance * 0.02 + 300}, 18);
    }
  }

  render () {
    const {validateImagesLoaded} = this.props;

    return (
      <div className={`${styles['drumheller-section']} ${styles.two}`}>
        <div className={styles['drumheller-section-two']}>
          <MainBanner
            animateInDiv={this.props.animateInDiv}
            description='We inspire a lifelong passion for science and foster a better understanding of the past, nurturing stewardship of our changing planet.'
            id='01'
            image={ImageOneOne}
            imageAlt='Ceratopsid!'
            imageHint='A ceratopsid skeleton'
            title='Our Vision'
            validateImagesLoaded={validateImagesLoaded}
          />
          <div className={styles['top-video-section']}>
            <div
              className={styles['upper-video']} ref={(e) => {
                this.topone = e;
              }}>
              <video autoPlay='autoplay' loop muted onLoad={validateImagesLoaded()}>
                <source src={VideoOneTwo} type='video/mp4' />
              </video>
            </div>
            <span ref={(e) => {
              this.bottomone = e;
            }}>
              <InView
                as='div' className={styles['lower-text']} delay={100}
                onChange={(inView, entry) => {
                  return this.props.animateInDiv(inView, entry);
                }} triggerOnce>
                The Tyrrell is Canada’s only<br />museum dedicated exclusively<br />to the science of palaeontology.
              </InView>
            </span>
          </div>
          <div className={styles['bottom-image-section']}>
            <div
              className={styles['upper-text']} ref={(e) => {
                this.toptwo = e;
              }}>
              <InView
                as='div' className={styles['panel-left']} delay={100}
                onChange={(inView, entry) => {
                  return this.props.animateInDiv(inView, entry);
                }} triggerOnce>
                “Part of what’s special about the museum is it’s situated<br />
                in the Badlands, so the surrounding landscape is very<br />
                rich in Cretaceous Period fossils and a lot of the<br />
                material that’s found in the museum are Alberta fossils.
              </InView>
              <InView
                as='div' className={styles['panel-right']} delay={100}
                onChange={(inView, entry) => {
                  return this.props.animateInDiv(inView, entry);
                }} triggerOnce>
                I think what’s special about coming here is the<br />
                landscape, and knowing that what you’re looking<br />
                at in the museum is so rooted in place and time and<br />
                connected, and our scientists are doing research.”
              </InView>
            </div>
            <div
              className={styles['bottom-image']} ref={(e) => {
                this.bottomtwo = e;
              }}>
              <img alt='Run!' onLoad={validateImagesLoaded()} src={ImageOneThree} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SectionTwo;
