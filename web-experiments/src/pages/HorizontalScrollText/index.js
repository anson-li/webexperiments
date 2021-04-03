/* eslint-disable no-return-assign */
import anime from 'animejs';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextLogo from '../../common/TextLogo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import withTransition from '../../common/WithTransition';
import './style.scss';

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

    gsap.set('#hz-page', { height: trackWidth })

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
        // onUpdate: (update) => console.log(update.progress)
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
    const sections = gsap.utils.toArray('.section');
    const sectionDuration = Math.floor(100/(sections.length - 1)) 

    sections.forEach((section, index) => {
      const text = section.querySelector('h1')
      const sectionStart = Math.max(sectionDuration * (index -1), 0)
      const tweenDuration = 100 + sectionStart <= 100 ? 100 : 100 - sectionStart;

      // Move the text
      if (index + 1 !== sections.length) {
        timeline.to(text, { xPercent:  'random(25,50,5)', duration: tweenDuration}, sectionStart)
      }
    })

    ScrollTrigger.refresh();
    // timeline.play();
  }

  render() {
    return (
      <div id="hz-page" ref={(e) => { this.el = e; }}>
        <TextLogo />
        <div className='track' id='track' ref={(e) => { this.track = e; }}>
          <section className='section'>
            <h1>Moving sideways is fun</h1>
          </section>

          <section className='section'>
            <h1>Horizontal relationships</h1>
          </section>

          <section className='section'>
            <h1>Contribution to others</h1>
          </section>

        </div>

        <div id='progress'>
          <div id='progressBar' />
        </div>
      </div>
    );
  }
}

Work.propTypes = {
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  mainPageRedirect: PropTypes.func.isRequired,
};

export default withTransition(Work);
