/* eslint-disable no-return-assign */
import anime from 'animejs';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";
import { Draggable, InertiaPlugin } from 'gsap/all';

import DinosaurScrollHint from './components/DinosaurScrollHint';
import SectionOne from './components/SectionOne';
import SectionTwo from './components/SectionTwo';
import SectionThree from './components/SectionThree';
import SectionFour from './components/SectionFour';
import Footer from './components/Footer';

import TextLogo from '../../../common/TextLogo';
import withTransition from '../../../common/WithTransition';
import './style.scss';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, SplitText);

class DrumhellerConcept extends PureComponent {
  constructor(props) {
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

  validateImagesLoaded() {
    this.loadedImages -= 1;
    this.checkLoaderStatus();
  }

  checkLoaderStatus() {
    console.log(`Loaded ${Math.round((27 - this.loadedImages) / 27 * 100)}%`);
    if (this.loadedImages <= 0) {
      this.props.hideLoader();
      this.sectionOne.current.drawUnderline();
    }
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

    this.scrollDistance = trackWidth - innerWidth;

    gsap.set('#track-wrapper', { width: trackWidth });
    
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

    this.pageST = ScrollTrigger.create({
      animation: this.timeline,
      horizontal: false,
      trigger: '#track',
      start: 0,
      scrub: 1,
      end: () => `+=${this.scrollDistance}`,
    });

    ScrollTrigger.refresh();

    this.setupResizeAnimation();
  }

  setupResizeAnimation() {
    // var progress = 0;
    ScrollTrigger.addEventListener("refreshInit", function() {
      // progress = this.pageST.scroll() / ScrollTrigger.maxScroll(window);
      // console.log(progress);
    });
    ScrollTrigger.addEventListener("refresh", function() {
      // this.pageST.scroll(progress * ScrollTrigger.maxScroll(window));
    });
    ScrollTrigger.refresh();
  }

  animateInDiv(inView, entry) {
    // Slide up when in view
    if (inView) {
      const childSplit = new SplitText(entry.target, {
        type: "lines",
        linesClass: "inview-split-child"
      });
      new SplitText(entry.target, {
        type: "lines",
        linesClass: "inview-split-parent"
      });
      gsap.set(entry.target, {
        opacity: 1,
      });
      gsap.from(childSplit.lines, {
        duration: 1.5,
        yPercent: 100,
        ease: "power4",
        stagger: 0.1,
      });
    } else {
      // Don't show when out of view
      gsap.set(entry.target, {
        opacity: 0
      });
    }
  }

  componentDidMount() {
    this.setupTrackAnimation();
    this.checkLoaderStatus();

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
        <div id="track-wrapper">
          <TextLogo
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          <div id='track' className='track' ref={(e) => { this.track = e; }}>
            <DinosaurScrollHint
              validateImagesLoaded={this.validateImagesLoaded}
            />
            <SectionOne
              timeline={this.timeline}
              scrollDistance={this.scrollDistance}
              validateImagesLoaded={this.validateImagesLoaded}
              ref={this.sectionOne}
            />
            <SectionTwo
              timeline={this.timeline}
              scrollDistance={this.scrollDistance}
              animateInDiv={this.animateInDiv}
              validateImagesLoaded={this.validateImagesLoaded}
            />
            <SectionThree
              timeline={this.timeline}
              scrollDistance={this.scrollDistance}
              animateInDiv={this.animateInDiv}
              validateImagesLoaded={this.validateImagesLoaded}
            />
            <SectionFour
              timeline={this.timeline}
              scrollDistance={this.scrollDistance}
              animateInDiv={this.animateInDiv}
              validateImagesLoaded={this.validateImagesLoaded}
            />
            <Footer
              timeline={this.timeline}
              scrollDistance={this.scrollDistance}
              animateInDiv={this.animateInDiv}
              validateImagesLoaded={this.validateImagesLoaded}
            />
          </div>
          <div id='drumheller-progress'>
            <div id='progressBar'/>
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
