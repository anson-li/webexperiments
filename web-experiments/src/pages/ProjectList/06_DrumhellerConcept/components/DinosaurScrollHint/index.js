import React, { PureComponent } from 'react';
import ScrollToExplore from '../Images/scroll-to-explore.svg';
import DinosaurSkull from '../Images/dinosaur-skull.png';
import { gsap } from 'gsap';

import styles from './style.module.scss';

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
    const { validateImagesLoaded } = this.props;
    return (
      <div className={styles["scroll-explore"]}>
        <img className={styles["rotating-logo"]} onLoad={validateImagesLoaded()} ref={(e) => { this.rotatinglogo = e; }} src={ScrollToExplore} alt="Scroll to Explore" />
        <img className={styles["skull-logo"]} onLoad={validateImagesLoaded()} src={DinosaurSkull} alt="Dino skull!" />
      </div> 
    );
  }
}


export default DinosaurScrollHint;
