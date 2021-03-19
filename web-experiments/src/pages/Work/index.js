/* eslint-disable no-return-assign */
import anime from 'animejs';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextLogo from '../../common/TextLogo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from './components/Section';

import EdmontonWall from '../../web/assets/edmonton-wall.jpg';
import JellicentBanner from '../../web/assets/images/project-banner/jellicent.jpg';
import AdditiveShaderBanner from '../../web/assets/images/project-banner/additiveshader.jpg'
import ASCIIShaderBanner from '../../web/assets/images/project-banner/asciishader.PNG'
import CoffeeCupBanner from '../../web/assets/images/project-banner/coffeecup.jpg'

import withTransition from '../../common/WithTransition';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

class Work extends PureComponent {
  constructor(props) {
    super(props);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.setupTrackAnimation = this.setupTrackAnimation.bind(this);
    this.setupScrollHintAnimation = this.setupScrollHintAnimation.bind(this);
    this.timeline = null;
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
    this.timeline.invalidate().restart();
    this.setupTrackAnimation();  
  }

  setupTrackAnimation() {
    const innerWidth = window.innerWidth;
    const track = this.track;
    const trackWidth = track.clientWidth;

    gsap.set('#work-page', { height: trackWidth });

    const scrollDistance = trackWidth - innerWidth + 300; // +300 is to offset the movement from the background wall at the beginning

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
        end: () => `+=${scrollDistance}`,
        onUpdate: () => {},
      } 
    }).to('#track', { 
      duration: 100,
      x: -scrollDistance
    });
    this.timeline.to('#progressBar', { xPercent: 100, duration: 100 }, 0);
    this.timeline.to(this.wall, { x: scrollDistance * 0.2, duration: 100 }, 0);
    this.timeline.to(this.scrollHint, { opacity: 0, duration: 20 }, 0);

    // Scrolltrigger to resize on fixed points
    var pageST = ScrollTrigger.create({});
    var progress = 0;
    ScrollTrigger.addEventListener("refreshInit", function() {
      progress = pageST.scroll() / ScrollTrigger.maxScroll(window);
    });
    ScrollTrigger.addEventListener("refresh", function() {
      pageST.scroll(progress * ScrollTrigger.maxScroll(window));
    });

    ScrollTrigger.refresh();
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
              id="01"
              title="Color Shader"
              description="Additive shader designed to 'wash' out the color in a three.js scene."
              date="MAR 2021"
              link="/additiveshader"
              image={AdditiveShaderBanner}
            />
            <Section
              id="02"
              title="ASCII Shader"
              description="ASCII shader designed to render text and shapes via passthrough."
              date="FEB 2021"
              link="/asciishader"
              image={ASCIIShaderBanner}
            />
            <Section
              id="03"
              title="Coffee Cup"
              description="Designed in Blender, completed the Blender tutorial and converted to three.js."
              date="FEB 2021"
              link="/coffeecup"
              image={CoffeeCupBanner}
            />
            <Section
              id="04"
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
