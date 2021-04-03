/* eslint-disable no-return-assign */
import anime from 'animejs';
import {
  gsap,
} from 'gsap';
import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger';
import {
  SplitText,
} from 'gsap/SplitText';
import {
  Draggable, InertiaPlugin,
} from 'gsap/all';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import withTransition from '../../../common/WithTransition';
import DinosaurScrollHint from './components/DinosaurScrollHint';
import Footer from './components/Footer';
import SectionFour from './components/SectionFour';
import SectionOne from './components/SectionOne';
import SectionThree from './components/SectionThree';
import SectionTwo from './components/SectionTwo';
import styles from './style.module.scss';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, SplitText);

class DrumhellerConcept extends PureComponent {
  constructor (props) {
    super(props);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.setupTrackAnimation = this.setupTrackAnimation.bind(this);
    this.setupResizeAnimation = this.setupResizeAnimation.bind(this);
    this.animateInDiv = this.animateInDiv.bind(this);
    this.validateImagesLoaded = this.validateImagesLoaded.bind(this);
    this.checkLoaderStatus = this.checkLoaderStatus.bind(this);

    this.timeline = null;
    this.scrollDistance = null;
    this.pageST = null;
    this.loadedImages = 27;
    this.sectionOne = React.createRef();
  }

  validateImagesLoaded () {
    this.loadedImages -= 1;
    this.checkLoaderStatus();
  }

  checkLoaderStatus () {
    console.log(`Loaded ${Math.round((27 - this.loadedImages) / 27 * 100)}%`);
    if (this.loadedImages <= 0) {
      this.props.hideLoader();
      this.sectionOne.current.drawUnderline();
    }
  }

  hidePage () {
    anime.remove(this.el);

    return anime({
      targets: this.el,
      opacity: 0,
      duration: 0,
    }).finished;
  }

  animateIn () {
    anime.remove(this.el);

    return anime({
      targets: this.el,
      opacity: [0, 1],
      duration: 1000,
      delay: 1000,
      easing: 'easeOutExpo',
    }).finished;
  }

  animateOut () {
    anime.remove(this.el);
    const { showLoader } = this.props;
    showLoader();

    return anime({
      targets: this.el,
      opacity: 0,
      duration: 1000,
      easing: 'easeOutExpo',
    }).finished;
  }

  onWindowResize () {
    // this.timeline.invalidate().restart();
    // this.setupTrackAnimation();
  }

  setupTrackAnimation () {
    const innerWidth = window.innerWidth;
    const track = this.track;
    const trackWidth = track.clientWidth;

    gsap.set(this.el, { height: trackWidth });

    this.scrollDistance = trackWidth - innerWidth;

    gsap.set(this.trackWrapper, { width: trackWidth });

    this.timeline = gsap.timeline({
      smoothChildTiming: true,
      defaults: {
        ease: 'none',
      },
    }).to(this.track, {
      duration: 100,
      x: -this.scrollDistance,
    });
    this.timeline.to(this.progressBar, { xPercent: 100,
      duration: 100 }, 0);

    this.pageST = ScrollTrigger.create({
      animation: this.timeline,
      horizontal: false,
      trigger: this.track,
      start: 0,
      scrub: 1,
      end: () => {
        return `+=${this.scrollDistance}`;
      },
    });

    ScrollTrigger.refresh();

    this.setupResizeAnimation();
  }

  setupResizeAnimation () {
    // var progress = 0;
    ScrollTrigger.addEventListener('refreshInit', () => {
      // progress = this.pageST.scroll() / ScrollTrigger.maxScroll(window);
      // console.log(progress);
    });
    ScrollTrigger.addEventListener('refresh', () => {
      // this.pageST.scroll(progress * ScrollTrigger.maxScroll(window));
    });
    ScrollTrigger.refresh();
  }

  animateInDiv (inView, entry) {
    // Slide up when in view
    if (inView) {
      const childSplit = new SplitText(entry.target, {
        type: 'lines',
        linesClass: 'inview-split-child',
      });
      new SplitText(entry.target, {
        type: 'lines',
        linesClass: 'inview-split-parent',
      });
      gsap.set(entry.target, {
        opacity: 1,
      });
      gsap.from(childSplit.lines, {
        duration: 1.5,
        yPercent: 100,
        ease: 'power4',
        stagger: 0.1,
      });
    } else {
      // Don't show when out of view
      gsap.set(entry.target, {
        opacity: 0,
      });
    }
  }

  componentDidMount () {
    this.setupTrackAnimation();
    this.checkLoaderStatus();

    Draggable.create('#track', {
      type: 'x',
      bounds: {minX: -1 * this.scrollDistance,
        maxX: 0}, // scroll X is done by offsetting to the right, so we move in negative values
      dragClickables: true,
      inertia: true,
      autoScroll: false,
      dragResistance: 0.5,
      throwResistance: 2000,
      onThrowUpdate: (event) => { // Grabs the scroll value while being updated by Draggable and updates the GSAP timeline to match
        const values = this.track.style.transform.split(/\w+\(|\);?/);
        const transform = values[1].split(/,\s?/g).map(parseInt);
        this.timeline.progress(-1 * transform[0] / this.scrollDistance);
        this.pageST.scroll(-1 * transform[0]);
      },
      onDrag: (event) => { // Grabs the scroll value while being updated by Draggable and updates the GSAP timeline to match
        const values = this.track.style.transform.split(/\w+\(|\);?/);
        const transform = values[1].split(/,\s?/g).map(parseInt);
        this.timeline.progress(-1 * transform[0] / this.scrollDistance);
        this.pageST.scroll(-1 * transform[0]);
      },
    });

    // window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount () {
    // window.removeEventListener('resize', this.onWindowResize);
  }

  render () {
    const { cursorHover, cursorUnhover } = this.props;

    return (
      <div
        id={styles['drumheller-main-page']} ref={(e) => {
          this.el = e;
        }}>
        <div
          id={styles['track-wrapper']} ref={(e) => {
            this.trackWrapper = e;
          }}>
          <TextLogo
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          <div
            className={styles.track} id='track' ref={(e) => {
              this.track = e;
            }}>
            <DinosaurScrollHint
              validateImagesLoaded={this.validateImagesLoaded}
            />
            <SectionOne
              ref={this.sectionOne}
              scrollDistance={this.scrollDistance}
              timeline={this.timeline}
              validateImagesLoaded={this.validateImagesLoaded}
            />
            <SectionTwo
              animateInDiv={this.animateInDiv}
              scrollDistance={this.scrollDistance}
              timeline={this.timeline}
              validateImagesLoaded={this.validateImagesLoaded}
            />
            <SectionThree
              animateInDiv={this.animateInDiv}
              scrollDistance={this.scrollDistance}
              timeline={this.timeline}
              validateImagesLoaded={this.validateImagesLoaded}
            />
            <SectionFour
              animateInDiv={this.animateInDiv}
              scrollDistance={this.scrollDistance}
              timeline={this.timeline}
              validateImagesLoaded={this.validateImagesLoaded}
            />
            <Footer
              animateInDiv={this.animateInDiv}
              scrollDistance={this.scrollDistance}
              timeline={this.timeline}
              validateImagesLoaded={this.validateImagesLoaded}
            />
          </div>
          <div id={styles['drumheller-progress']}>
            <div
              id={styles.progressBar} ref={(e) => {
                this.progressBar = e;
              }} />
          </div>
        </div>
      </div>
    );
  }
}

DrumhellerConcept.propTypes = {
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
};

export default withTransition(DrumhellerConcept);
