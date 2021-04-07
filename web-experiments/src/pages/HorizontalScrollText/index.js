import anime from 'animejs';
import {
  gsap,
} from 'gsap';
import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../common/TextLogo';
import withTransition from '../../common/WithTransition';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

class Work extends PureComponent {
  componentDidMount () {
    this.props.hideLoader();
    const innerWidth = window.innerWidth;
    const track = this.track;

    const trackWidth = track.clientWidth;

    gsap.set('#hz-page', {height: trackWidth});

    const scrollDistance = trackWidth - innerWidth;

    const timeline = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        end: () => {
          return `+=${scrollDistance}`;
        },
        horizontal: false,
        scrub: 1,
        start: 0,
        trigger: '#track',

        // onUpdate: (update) => console.log(update.progress)
      },
      smoothChildTiming: true,
    }).to('#track', {
      duration: 100,
      x: -scrollDistance,
    });

    /**
     * Timeline progress bar translates on X from -100% to 0% over the full duration (100)
     */
    timeline.to('#progressBar', {duration: 100,
      xPercent: 100}, 0);

    /**
     * Map tweens for each section
     */
    const sections = gsap.utils.toArray('.section');
    const sectionDuration = Math.floor(100 / (sections.length - 1));

    sections.forEach((section, index) => {
      const text = section.querySelector('h1');
      const sectionStart = Math.max(sectionDuration * (index - 1), 0);
      const tweenDuration = 100 + sectionStart <= 100 ? 100 : 100 - sectionStart;

      // Move the text
      if (index + 1 !== sections.length) {
        timeline.to(text, {duration: tweenDuration,
          xPercent: 'random(25,50,5)'}, sectionStart);
      }
    });

    ScrollTrigger.refresh();

    // timeline.play();
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

  render () {
    return (
      <div
        id='hz-page' ref={(element) => {
          this.el = element;
        }}>
        <TextLogo />
        <div
          className='track' id='track' ref={(element) => {
            this.track = element;
          }}>
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
  hideLoader: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

export default withTransition(Work);
