/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TweenLite, gsap, Power4 } from 'gsap';
import { SplitText } from "gsap/SplitText";

import DinosaurScrollHint from '../DinosaurScrollHint';
import SectionOne from './components/SectionOne';
import SectionTwo from './components/SectionTwo';
import SectionThree from './components/SectionThree';
import SectionFour from './components/SectionFour';
import Footer from './components/Footer';

import './style.scss';

gsap.registerPlugin(SplitText);

class Section extends PureComponent {
  constructor(props) {
    super(props);
    this.animateInDiv = this.animateInDiv.bind(this);
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

  render() {
    const { timeline, scrollDistance } = this.props;
    return (
      <>
        <DinosaurScrollHint />
        <SectionOne
          timeline={timeline}
          scrollDistance={scrollDistance}
        />
        <SectionTwo
          timeline={timeline}
          scrollDistance={scrollDistance}
          animateInDiv={this.animateInDiv}
        />
        <SectionThree
          timeline={timeline}
          scrollDistance={scrollDistance}
          animateInDiv={this.animateInDiv}
        />
        <SectionFour
          timeline={timeline}
          scrollDistance={scrollDistance}
          animateInDiv={this.animateInDiv}
        />
        <Footer
          timeline={timeline}
          scrollDistance={scrollDistance}
          animateInDiv={this.animateInDiv}
        />
      </>
    );
  }
}

Section.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Section;
