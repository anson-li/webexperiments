import {
  gsap,
} from 'gsap';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import DinosaurSkull from '../Images/dinosaur-skull.png';
import ScrollToExplore from '../Images/scroll-to-explore.svg';
import styles from './style.module.scss';

class DinosaurScrollHint extends PureComponent {
  componentDidMount () {
    gsap.from(this.rotatinglogo, {
      duration: 10,
      ease: 'none',
      repeat: -1,
      rotation: 360,
    });
  }

  render () {
    const {validateImagesLoaded} = this.props;

    return (
      <div className={styles['scroll-explore']}>
        <img
          alt='Scroll to Explore' className={styles['rotating-logo']} onLoad={validateImagesLoaded()}
          ref={(element) => {
            this.rotatinglogo = element;
          }} src={ScrollToExplore} />
        <img alt='Dino skull!' className={styles['skull-logo']} onLoad={validateImagesLoaded()} src={DinosaurSkull} />
      </div>
    );
  }
}

DinosaurScrollHint.propTypes = {
  validateImagesLoaded: PropTypes.func.isRequired,
};

export default DinosaurScrollHint;
