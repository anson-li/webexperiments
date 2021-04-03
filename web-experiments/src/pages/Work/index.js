/* eslint-disable no-return-assign */
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
import withTransition from '../../common/WithTransition';
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
    this.onWindowResize = this.onWindowResize.bind(this);
    this.setupTrackAnimation = this.setupTrackAnimation.bind(this);
    this.setupScrollHintAnimation = this.setupScrollHintAnimation.bind(this);
    this.setupResizeAnimation = this.setupResizeAnimation.bind(this);
    this.timeline = null;
    this.scrollDistance = null;
    this.pageST = null;
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
    gsap.set(this.trackWrapper, { width: trackWidth });

    this.scrollDistance = trackWidth - innerWidth;

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
    this.timeline.to(this.wall, { x: this.scrollDistance * 0.2,
      duration: 100 }, 0);
    this.timeline.to(this.scrollHint, { opacity: 0,
      duration: 20 }, 0);

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

    this.setupResizeAnimation();

    ScrollTrigger.refresh();
  }

  setupResizeAnimation () {
    // Scrolltrigger to resize on fixed points
    // var pageST = ScrollTrigger.create({});
    // var progress = 0;
    // ScrollTrigger.addEventListener("refreshInit", function() {
    //   progress = pageST.scroll() / ScrollTrigger.maxScroll(window);
    // });
    // ScrollTrigger.addEventListener("refresh", function() {
    //   pageST.scroll(progress * ScrollTrigger.maxScroll(window));
    // });
  }

  setupScrollHintAnimation () {
    const scrollHintTimeline = gsap.timeline();
    scrollHintTimeline.to(this.hintArrow, 1, {paddingLeft: '5px',
      onComplete () {
        scrollHintTimeline.reverse();
      },
      onReverseComplete () {
        scrollHintTimeline.play(0);
      }}, 0);
  }

  componentDidMount () {
    this.props.hideLoader();
    this.setupTrackAnimation();
    this.setupScrollHintAnimation();

    Draggable.create(this.track, {
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
        id={styles['work-page']} ref={(e) => {
          this.el = e;
        }}>
        <div id={styles['animation-wrapper']}>
          <TextLogo
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          <div
            id={styles['track-wrapper']} ref={(e) => {
              this.trackWrapper = e;
            }}>
            <div
              className={styles.track} id={styles.track} ref={(e) => {
                this.track = e;
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
                ref={(e) => {
                  this.wall = e;
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
            ref={(e) => {
              this.scrollHint = e;
            }}
          >
            Scroll to Explore <span
              className={styles['hint-arrow']} ref={(e) => {
                this.hintArrow = e;
              }}>→</span>
          </div>
          <div id={styles.progress}>
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

Work.propTypes = {
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
};

export default withTransition(Work);
