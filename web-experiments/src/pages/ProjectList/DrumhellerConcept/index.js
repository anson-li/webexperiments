/* eslint-disable no-return-assign */
import anime from 'animejs';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextLogo from '../../../common/TextLogo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from './components/Section';

import withTransition from '../../../common/WithTransition';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

class DrumhellerConcept extends PureComponent {
  constructor(props) {
    super(props);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.setupTrackAnimation = this.setupTrackAnimation.bind(this);
    this.setupScrollHintAnimation = this.setupScrollHintAnimation.bind(this);
    this.setupResizeAnimation = this.setupResizeAnimation.bind(this);
    this.timeline = null;
    this.scrollDistance = null;
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

    this.scrollDistance = trackWidth - innerWidth + 300; // +300 is to offset the movement from the background wall at the beginning

    this.timeline = gsap.timeline({
      smoothChildTiming: true,
      defaults: {
        ease: 'none'
      },
      scrollTrigger: {
        horizontal: false,
        trigger: '#track',
        start: 0,
        scrub: 1,
        end: () => `+=${this.scrollDistance}`,
        onUpdate: () => {},
      } 
    }).to('#track', { 
      duration: 100,
      x: -this.scrollDistance
    });
    this.timeline.to('#progressBar', { xPercent: 100, duration: 100 }, 0);
    this.timeline.to(this.scrollHint, { opacity: 0, duration: 20 }, 0);

    this.setupResizeAnimation();
    ScrollTrigger.refresh();
  }

  setupResizeAnimation() {
    // Scrolltrigger to resize on fixed points
    var pageST = ScrollTrigger.create({});
    var progress = 0;
    ScrollTrigger.addEventListener("refreshInit", function() {
      progress = pageST.scroll() / ScrollTrigger.maxScroll(window);
      console.log(progress);
    });
    ScrollTrigger.addEventListener("refresh", function() {
      pageST.scroll(progress * ScrollTrigger.maxScroll(window));
    });
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
          <div id='track' className='track' ref={(e) => { this.track = e; }}>
            <Section 
              text="Drumheller"
              timeline={this.timeline}
              scrollDistance={this.scrollDistance} 
            />
          </div>
          <div
            className="scroll-hint"
            ref={(e) => { this.scrollHint = e; }}
          >
            Scroll to Explore <span className="hint-arrow" ref={(e) => { this.hintArrow = e; }}>→</span>
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
