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

class SingleImageDescription extends PureComponent {
  componentDidMount () {
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

    // Template for slide up without any rotations
    const childSplit = new SplitText(this.animatedimagedescription, {
      linesClass: 'inview-split-child',
      type: 'lines',
    });
    // eslint-disable-next-line no-new
    new SplitText(this.animatedimagedescription, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
    gsap.from(childSplit.lines, {
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
        {/* <div
            className={styles['animated-box']} /> */}
        <div
          className={styles['first-image']}>
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
              style={{backgroundImage: 'url(https://unsplash.it/600/400?random=1)'}} />
          </div>
          <div
            className={styles['image-description']}
            ref={(element) => {
              this.animatedimagedescription = element;
            }}>
            Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy
            foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive
            innovation via workplace diversity and empowerment. Bring to the table win-win survival strategies to ensure proactive domination.
            At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a
            streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.
            Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.
            Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway
            will close the loop on focusing solely on the bottom line.
          </div>
        </div>
      </>
    );
  }
}

export default SingleImageDescription;

