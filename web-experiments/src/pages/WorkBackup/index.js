/* eslint-disable no-return-assign */
import anime from 'animejs';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextLogo from '../../common/TextLogo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from './components/Section';

import withTransition from '../../common/WithTransition';
import './style.scss';
import ThreeSphere from './components/ThreeSphere';

gsap.registerPlugin(ScrollTrigger);

class Work extends PureComponent {
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

  componentDidMount() {
    this.props.hideLoader();
    const innerWidth = window.innerWidth;
    const track = this.track;

    const trackWidth = track.clientWidth;

    gsap.set('#work-page', { height: trackWidth });

    const scrollDistance = trackWidth - innerWidth;

    const timeline = gsap.timeline({
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
        onUpdate: (update) => console.log(update.progress)
      } 
    }).to('#track', { 
      duration: 100,
      x: -scrollDistance
    });


    /**
     * Timeline progress bar translates on X from -100% to 0% over the full duration (100)
     */
    timeline.to('#progressBar', { xPercent: 100, duration: 100 }, 0)
    
    /**
     * Map tweens for each section
     */
    // const sections = gsap.utils.toArray('.section');
    // const sectionDuration = Math.floor(100 / (sections.length - 1)) ;

    // sections.forEach((section, index) => {
    //   const text = section.querySelector('h1');
    //   const sectionStart = Math.max(sectionDuration * (index -1), 0)
    //   const tweenDuration = 100 + sectionStart <= 100 ? 100 : 100 - sectionStart;
    //   console.log({index},{sectionStart},{sectionDuration});

    //   // Move the text
    //   // if (index + 1 !== sections.length) {
    //   //   timeline.to(text, {
    //   //     xPercent: 'random(-25, 0, 5)',
    //   //     duration: tweenDuration
    //   //   }, sectionStart);
    //   // }
    // })

    ScrollTrigger.refresh();
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
              title="Color Shader"
              description="Additive shader designed to 'wash' out the color in a three.js scene."
              date="MAR 2021"
              link="/additiveshader"
              hover={cursorHover}
              unhover={cursorUnhover}
            />
            <Section
              title="ASCII Shader"
              description="ASCII shader designed to render text and shapes via passthrough."
              date="FEB 2021"
              link="/asciishader"
              hover={cursorHover}
              unhover={cursorUnhover}
            /><Section
            title="Jellicent"
            description="First foray into three.js. Basic exploration of imported models, post-processing and camera movement."
            date="DEC 2020"
            link="/jellicent"
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          </div>
          <div id='progress'>
            <div id='progressBar'/>
          </div>
          <ThreeSphere
            hideLoader={this.props.hideLoader}
          />
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
