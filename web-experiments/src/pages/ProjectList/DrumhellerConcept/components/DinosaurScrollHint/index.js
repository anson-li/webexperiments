import React, { PureComponent } from 'react';
import ScrollToExplore from '../Images/scroll-to-explore.svg';
import DinosaurSkull from '../Images/dinosaur-skull.png';
import { gsap } from 'gsap';

import './style.scss';

class DinosaurScrollHint extends PureComponent {
  componentDidMount() {
    gsap.from(this.rotatinglogo, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "none",
    });
  }

  render() {
    return (
      <div className="scroll-explore">
        <img className="rotating-logo" ref={(e) => { this.rotatinglogo = e; }} src={ScrollToExplore} alt="Scroll to Explore" />
        <img className="skull-logo" src={DinosaurSkull} alt="Dino skull!" />
      </div> 
    );
  }
}


export default DinosaurScrollHint;
