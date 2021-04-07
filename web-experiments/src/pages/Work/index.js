import anime from 'animejs';
import {
  gsap,
} from 'gsap';
import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger';
import {
  Draggable, InertiaPlugin,
} from 'gsap/all';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../common/TextLogo';
import WithTransition from '../../common/WithTransition';
import EdmontonWall from '../../web/assets/edmonton-wall.jpg';
import AdditiveShaderBanner from '../../web/assets/images/project-banner/additiveshader.jpg';
import ASCIIShaderBanner from '../../web/assets/images/project-banner/asciishader.PNG';
import CanvasMountain from '../../web/assets/images/project-banner/canvasmountain.PNG';
import CoffeeCupBanner from '../../web/assets/images/project-banner/coffeecup.jpg';
import DinosaurLoader from '../../web/assets/images/project-banner/dinoloader.PNG';
import DrumhellerConcept from '../../web/assets/images/project-banner/drumhellerconcept.jpg';
import JellicentBanner from '../../web/assets/images/project-banner/jellicent.jpg';
import Section from './components/Section';
import styles from './style.module.scss';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

class Work extends PureComponent {
  constructor (props) {
    super(props);
    this.setupDraggableTrack = this.setupDraggableTrack.bind(this);
    this.setupTrackAnimation = this.setupTrackAnimation.bind(this);
    this.setupScrollTrigger = this.setupScrollTrigger.bind(this);
    this.setupScrollHintAnimation = this.setupScrollHintAnimation.bind(this);
    this.setupResizeAnimation = this.setupResizeAnimation.bind(this);
    this.timeline = null;
    this.scrollDistance = null;
    this.pageST = null;
  }

  componentDidMount () {
    this.props.hideLoader();
    this.setupTrackAnimation();
    this.setupScrollHintAnimation();
    this.setupScrollTrigger();
    this.setupResizeAnimation();
    this.setupDraggableTrack();
    ScrollTrigger.refresh();
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
    const {showLoader} = this.props;
    showLoader();

    return anime({
      duration: 1000,
      easing: 'easeOutExpo',
      opacity: 0,
      targets: this.el,
    }).finished;
  }

  setupTrackAnimation () {
    const innerWidth = window.innerWidth;
    const track = this.track;
    const trackWidth = track.clientWidth;

    gsap.set(this.el, {height: trackWidth});
    gsap.set(this.trackWrapper, {width: trackWidth});

    this.scrollDistance = trackWidth - innerWidth;

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
    this.timeline.to(this.wall, {duration: 100,
      x: this.scrollDistance * 0.2}, 0);
    this.timeline.to(this.scrollHint, {duration: 20,
      opacity: 0}, 0);
  }

  setupDraggableTrack () {
    Draggable.create(this.track, {
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
  }

  setupScrollTrigger () {
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
  }

  setupResizeAnimation () {
    // ScrollTrigger to resize on fixed points
    let progress = 0;
    ScrollTrigger.addEventListener('refreshInit', () => {
      progress = this.pageST.scroll() / ScrollTrigger.maxScroll(window);
    });
    ScrollTrigger.addEventListener('refresh', () => {
      this.pageST.scroll(progress * ScrollTrigger.maxScroll(window));
    });
  }

  setupScrollHintAnimation () {
    const scrollHintTimeline = gsap.timeline();
    scrollHintTimeline.to(this.hintArrow, 1, {onComplete () {
      scrollHintTimeline.reverse();
    },
    onReverseComplete () {
      scrollHintTimeline.play(0);
    },
    paddingLeft: '5px'}, 0);
  }

  render () {
    const {cursorHover, cursorUnhover} = this.props;

    return (
      <div
        id={styles['work-page']} ref={(element) => {
          this.el = element;
        }}>
        <div id={styles['animation-wrapper']}>
          <TextLogo
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          <div
            id={styles['track-wrapper']} ref={(element) => {
              this.trackWrapper = element;
            }}>
            <div
              className={styles.track} id={styles.track} ref={(element) => {
                this.track = element;
              }}>
              <Section
                date='MAR 2021'
                description='Test implementation for WebGL, converting images into live canvas.'
                id='07'
                image={CanvasMountain}
                link='/webglcurtains'
                title='WEBGL - Curtains'
              />
              <Section
                date='MAR 2021'
                description="Proof of concept for Drumheller's main page. Used advanced GSAP techniques &amp; video manipulation."
                id='06'
                image={DrumhellerConcept}
                link='/drumheller'
                title='Drumheller Concept'
              />
              <Section
                date='MAR 2021'
                description='Fill loader template built via SVG and GSAP. Replace with your logo!'
                id='05'
                image={DinosaurLoader}
                link='/dinosaurloader'
                title='Fill Loader'
              />
              <Section
                date='MAR 2021'
                description="Additive shader designed to 'wash' out the color in a three.js scene."
                id='04'
                image={AdditiveShaderBanner}
                link='/additiveshader'
                title='Color Shader'
              />
              <Section
                date='FEB 2021'
                description='ASCII shader designed to render text and shapes via passthrough.'
                id='03'
                image={ASCIIShaderBanner}
                link='/asciishader'
                title='ASCII Shader'
              />
              <Section
                date='FEB 2021'
                description='Designed in Blender, completed the Blender tutorial and converted to three.js.'
                id='02'
                image={CoffeeCupBanner}
                link='/coffeecup'
                title='Coffee Cup'
              />
              <Section
                date='DEC 2020'
                description='First foray into three.js. Exploration of imported models &amp; camera movement.'
                id='01'
                image={JellicentBanner}
                link='/jellicent'
                title='Jellicent'
              />
              <div
                className={styles.wall}
                ref={(element) => {
                  this.wall = element;
                }}
              >
                <img
                  alt='Skyline of Edmonton'
                  className={styles['img-wall']}
                  src={EdmontonWall}
                />
              </div>
            </div>
          </div>
          <div
            className={styles['scroll-hint']}
            ref={(element) => {
              this.scrollHint = element;
            }}
          >
            Scroll to Explore <span
              className={styles['hint-arrow']} ref={(element) => {
                this.hintArrow = element;
              }}>→</span>
          </div>
          <div id={styles.progress}>
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

Work.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

export default WithTransition(Work);
