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
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import GridBackground from './Images/pixelgrid.png';
import Header from './components/Header';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class SlideInText extends PureComponent {
  constructor (props) {
    super(props);
    this.animatedelements = null;
    this.animatedelementsdescription = null;
    this.childSplit = null;
  }

  componentDidMount () {
    this.props.hideLoader();
    this.props.hideFollow();
    this.animatedelements = new SplitText(this.animatedtitle, {
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
    gsap.set(this.animatedelements.chars, {
      backfaceVisibility: 'hidden',
      z: 300,
    });
    gsap.from(this.animatedelements.chars, 0.7, {
      delay: 1,
      ease: Power4,
      opacity: 0,
      rotationX: '90',
      stagger: 0.1,
      transformOrigin: '50% 50% 100px',
    });

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
    const childSplit1 = new SplitText(this.animatedimagedescription, {
      linesClass: 'inview-split-child',
      type: 'lines',
    });
    // eslint-disable-next-line no-new
    new SplitText(this.animatedimagedescription, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
    gsap.from(childSplit1.lines, {
      delay: 1.8,
      duration: 1.5,
      ease: 'power4',
      stagger: 0.1,
      yPercent: 100,
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
        <Header />
        <div
          className={styles['page-content']}
          style={{backgroundImage: `url(${GridBackground})`}}>
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
                style={{backgroundImage: 'url(https://unsplash.it/1920/1080?random=1)'}} />
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
