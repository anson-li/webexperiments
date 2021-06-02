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

  componentDidMount () {
    this.setupTrackAnimation();
    this.checkLoaderStatus();

    Draggable.create('#track', {
      autoScroll: false,

      bounds: {maxX: 0,
        minX: -1 * this.scrollDistance},

      // scroll X is done by offsetting to the right, so we move in negative values
      dragClickables: true,
      dragResistance: 0.5,
      inertia: true,
      onDrag: (event) => {
        // Grabs the scroll value while being updated by Draggable and updates the GSAP timeline to match
        const values = this.track.style.transform.split(/\w+\(|\);?/);
        const transform = values[1].split(/,\s?/g).map(parseInt);
        this.timeline.progress(-1 * transform[0] / this.scrollDistance);
        this.pageST.scroll(-1 * transform[0]);
      },
      onThrowUpdate: (event) => {
        // Grabs the scroll value while being updated by Draggable and updates the GSAP timeline to match
        const values = this.track.style.transform.split(/\w+\(|\);?/);
        const transform = values[1].split(/,\s?/g).map(parseInt);
        this.timeline.progress(-1 * transform[0] / this.scrollDistance);
        this.pageST.scroll(-1 * transform[0]);
      },
      throwResistance: 2000,
      type: 'x',
    });

    // window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount () {
    // window.removeEventListener('resize', this.onWindowResize);
  }

  validateImagesLoaded () {
    this.loadedImages -= 1;
    this.checkLoaderStatus();
  }

  checkLoaderStatus () {
    if (this.loadedImages <= 0) {
      this.props.hideLoader();
      this.sectionOne.current.drawUnderline();
    }
  }

  animateIn () {
    this.props.hideLoader();
  }

  animateOut () {
    this.props.showLoader();
  }

  onWindowResize () {
    // this.timeline.invalidate().restart();
    // this.setupTrackAnimation();
  }

  setupTrackAnimation () {
    const innerWidth = window.innerWidth;
    const track = this.track;
    const trackWidth = track.clientWidth;

    gsap.set(this.el, {height: trackWidth});

    this.scrollDistance = trackWidth - innerWidth;

    gsap.set(this.trackWrapper, {width: trackWidth});

    this.timeline = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      smoothChildTiming: true,
    }).to(this.track, {
      duration: 100,
      x: -this.scrollDistance,
    });
    this.timeline.to(this.progressBar, {duration: 100,
      xPercent: 100}, 0);

    this.pageST = ScrollTrigger.create({
      animation: this.timeline,
      end: () => {
        return `+=${this.scrollDistance}`;
      },
      horizontal: false,
      scrub: 1,
      start: 0,
      trigger: this.track,
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
        linesClass: 'inview-split-child',
        type: 'lines',
      });
      // eslint-disable-next-line no-new
      new SplitText(entry.target, {
        linesClass: 'inview-split-parent',
        type: 'lines',
      });
      gsap.set(entry.target, {
        opacity: 1,
      });
      gsap.from(childSplit.lines, {
        duration: 1.5,
        ease: 'power4',
        stagger: 0.1,
        yPercent: 100,
      });
    } else {
      // Don't show when out of view
      gsap.set(entry.target, {
        opacity: 0,
      });
    }
  }

  render () {
    const {cursorHover, cursorUnhover, transitionStatus} = this.props;

    return (
      <div
        className={transitionStatus}
        id={styles['drumheller-main-page']} ref={(element) => {
          this.el = element;
        }}>
        <div
          id={styles['track-wrapper']} ref={(element) => {
            this.trackWrapper = element;
          }}>
          <TextLogo
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          <div
            className={styles.track} id='track' ref={(element) => {
              this.track = element;
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
              id={styles.progressBar} ref={(element) => {
                this.progressBar = element;
              }} />
          </div>
        </div>
      </div>
    );
  }
}

DrumhellerConcept.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  transitionStatus: PropTypes.string.isRequired,
};

export default DrumhellerConcept;
