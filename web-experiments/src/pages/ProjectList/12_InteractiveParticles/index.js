// https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/
import {
  gsap,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import ImageParticles from './components/ImageParticles';

gsap.registerPlugin(SplitText);

class InteractiveParticles extends PureComponent {
  render () {
    const {cursorHover, cursorUnhover} = this.props;

    return (
      <div
        id='interactive-particles'
        ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <ImageParticles />
      </div>
    );
  }
}

InteractiveParticles.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
};

export default InteractiveParticles;
