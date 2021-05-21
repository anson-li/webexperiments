import {
  gsap, Power4,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import React, {
  PureComponent,
} from 'react';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class HeroText extends PureComponent {
  componentDidMount () {
    const animatedelements = new SplitText(this.animatedtitle, {
      type: 'chars',
    });

    // Template for rolling items up into the page
    gsap.set(this.animatedtitle, {
      perspective: '1200px',
      perspectiveOrigin: '300px',
      scale: 0.75,
      transformOrigin: 'center',
      x: -50,
    });
    gsap.set(animatedelements.chars, {
      backfaceVisibility: 'hidden',
      z: 300,
    });
    gsap.from(animatedelements.chars, 0.7, {
      delay: 1,
      ease: Power4,
      opacity: 0,
      rotationX: '90',
      stagger: 0.1,
      transformOrigin: '50% 50% 100px',
    });

    // Template for slide up without any rotations
    const childSplit2 = new SplitText(this.mainsubtitle, {
      linesClass: 'inview-split-child',
      type: 'lines',
    });
    // eslint-disable-next-line no-new
    new SplitText(this.mainsubtitle, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
    gsap.from(childSplit2.lines, {
      delay: 1.8,
      duration: 1.5,
      ease: 'power4',
      stagger: 0.1,
      yPercent: 100,
    });
  }

  render () {
    return (
      <>
        {/* <div className={styles['animated-text-template']}>
            Preon.
          </div> */}
        <div
          className={styles['main-banner']}>
          <div
            className={styles['animated-text']}
            ref={(element) => {
              this.animatedtitle = element;
            }}>
            Preon.
          </div>
          <div
            className={styles['main-subtitle']}
            ref={(element) => {
              this.mainsubtitle = element;
            }}
          >
            Driven.<br />Design.<br />Perfection.
          </div>
        </div>
      </>
    );
  }
}

export default HeroText;

