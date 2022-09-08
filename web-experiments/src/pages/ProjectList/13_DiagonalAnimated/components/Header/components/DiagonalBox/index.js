import {
  gsap, Power4,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class DiagonalBox extends PureComponent {
  componentDidMount () {
    const {timeline, delay} = this.props;
    gsap.set(this.animatedinnerimage, {
      backgroundImage: `linear-gradient(#111B22 0%, #BC041F  ${25 - delay * 2}%, #D64D22 ${25 + delay * 3}%, #111B22 120%`,
    });
    gsap.from(this.animatedinnerimage, 3.5, {
      backgroundImage: `linear-gradient(#111B22 0%, #111B22 ${15 - delay * 2}%, #47AED3 ${25 + delay * 3}%, #111B22 100%`,
      delay: delay * 0.2,
      ease: 'none',
      repeat: -1,
      repeatDelay: 0,
      yoyo: true,
    });
    if (timeline) {
      timeline.to(this.animatedinnerimage, {
        x: `-${1000 - delay * 100}px`,
        y: `-${1500 - delay * 100}px`,
      }, 0);
    }
  }

  render () {
    return (
      <div
        className={`${styles.box} ${styles.red}`}
        ref={(element) => {
          this.animatedinnerimage = element;
        }} />
    );
  }
}

DiagonalBox.propTypes = {
  delay: PropTypes.number.isRequired,
  timeline: PropTypes.object.isRequired,
};

export default DiagonalBox;

