/* eslint-disable no-return-assign */
import anime from 'animejs';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextLogo from '../../common/TextLogo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable, InertiaPlugin } from 'gsap/all';
import Section from './components/Section';

import EdmontonWall from '../../web/assets/edmonton-wall.jpg';
import JellicentBanner from '../../web/assets/images/project-banner/jellicent.jpg';
import AdditiveShaderBanner from '../../web/assets/images/project-banner/additiveshader.jpg';
import ASCIIShaderBanner from '../../web/assets/images/project-banner/asciishader.PNG';
import CoffeeCupBanner from '../../web/assets/images/project-banner/coffeecup.jpg';
import DinosaurLoader from '../../web/assets/images/project-banner/dinoloader.PNG';
import DrumhellerConcept from '../../web/assets/images/project-banner/drumhellerconcept.jpg';

import withTransition from '../../common/WithTransition';
import './style.scss';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

class Work extends PureComponent {
  constructor(props) {
    super(props);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.setupTrackAnimation = this.setupTrackAnimation.bind(this);
    this.setupScrollHintAnimation = this.setupScrollHintAnimation.bind(this);
    this.setupResizeAnimation = this.setupResizeAnimation.bind(this);
    this.timeline = null;
    this.scrollDistance = null;
    this.pageST = null;
  }

  hidePage() {
    anime.remove(this.el);
    return anime({
      targets: this.el,
      opacity: 0,
      duration: 0,
    }).finished;
  }

  animateIn() {
    anime.remove(this.el);
    return anime({
      targets: this.el,
      opacity: [0, 1],
      duration: 1000,
      delay: 1000,
      easing: 'easeOutExpo',
    }).finished;
  }

  animateOut() {
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

  onWindowResize() {
    // this.timeline.invalidate().restart();
    // this.setupTrackAnimation();
  }

  setupTrackAnimation() {
    const innerWidth = window.innerWidth;
    const track = this.track;
    const trackWidth = track.clientWidth;

    gsap.set('#work-page', { height: trackWidth });
    gsap.set('#track-wrapper', { width: trackWidth });

    this.scrollDistance = trackWidth - innerWidth;

    this.timeline = gsap.timeline({
      smoothChildTiming: true,
      defaults: {
        ease: 'none'
      },
    }).to('#track', { 
      duration: 100,
      x: -this.scrollDistance
    });
    this.timeline.to('#progressBar', { xPercent: 100, duration: 100 }, 0);
    this.timeline.to(this.wall, { x: this.scrollDistance * 0.2, duration: 100 }, 0);
    this.timeline.to(this.scrollHint, { opacity: 0, duration: 20 }, 0);

    this.pageST = ScrollTrigger.create({
      animation: this.timeline,
      horizontal: false,
      trigger: '#track',
      start: 0,
      scrub: 1,
      end: () => `+=${this.scrollDistance}`,
    });

    this.setupResizeAnimation();

    ScrollTrigger.refresh();
  }

  setupResizeAnimation() {
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

  setupScrollHintAnimation() {
    const scrollHintTimeline = gsap.timeline();
    scrollHintTimeline.to(this.hintArrow, 1, {
      paddingLeft: '5px',
      onComplete: function () {
        scrollHintTimeline.reverse();
     }, onReverseComplete: function () {
        scrollHintTimeline.play(0);
     }}, 0)
  }

  componentDidMount() {
    this.props.hideLoader();
    this.setupTrackAnimation();
    this.setupScrollHintAnimation();

    Draggable.create('#track', {
      type: 'x',
      bounds: {minX: -1 * this.scrollDistance, maxX: 0}, // scroll X is done by offsetting to the right, so we move in negative values
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

  componentWillUnmount() {
    // window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    const { cursorHover, cursorUnhover } = this.props;
    return (
      <div id="work-page" ref={(e) => { this.el = e; }}>
        <div id="animation-wrapper">
          <TextLogo
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          <div id="track-wrapper">
            <div id='track' className='track' ref={(e) => { this.track = e; }}>
              <Section
                id="06"
                title="Drumheller Concept"
                description="Proof of concept for Drumheller's main page. Used advanced GSAP techniques &amp; video manipulation."
                date="MAR 2021"
                link="/drumheller"
                image={DrumhellerConcept}
              />
              <Section
                id="05"
                title="Fill Loader"
                description="Fill loader template built via SVG and GSAP. Replace with your logo!"
                date="MAR 2021"
                link="/dinosaurloader"
                image={DinosaurLoader}
              />
              <Section
                id="04"
                title="Color Shader"
                description="Additive shader designed to 'wash' out the color in a three.js scene."
                date="MAR 2021"
                link="/additiveshader"
                image={AdditiveShaderBanner}
              />
              <Section
                id="03"
                title="ASCII Shader"
                description="ASCII shader designed to render text and shapes via passthrough."
                date="FEB 2021"
                link="/asciishader"
                image={ASCIIShaderBanner}
              />
              <Section
                id="02"
                title="Coffee Cup"
                description="Designed in Blender, completed the Blender tutorial and converted to three.js."
                date="FEB 2021"
                link="/coffeecup"
                image={CoffeeCupBanner}
              />
              <Section
                id="01"
                title="Jellicent"
                description="First foray into three.js. Exploration of imported models &amp; camera movement."
                date="DEC 2020"
                link="/jellicent"
                image={JellicentBanner}
              />
              <div
                className="wall"
                ref={(e) => { this.wall = e; }}
              >
                <img
                  className="img-wall"
                  src={EdmontonWall}
                  alt="Skyline of Edmonton"
                />
              </div>
            </div>
          </div>
          <div
            className="scroll-hint"
            ref={(e) => { this.scrollHint = e; }}
          >
            Scroll to Explore <span className="hint-arrow" ref={(e) => { this.hintArrow = e; }}>→</span>
          </div>
          <div id='progress'>
            <div id='progressBar'/>
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
