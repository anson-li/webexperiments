/* eslint-disable no-return-assign */
import anime from 'animejs';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Background from '../../../common/Background';
import TextLogo from '../../../common/TextLogo';
import withTransition from '../../../common/WithTransition';
import ThreeJS from './components/ThreeJS';

class AdditiveShader extends PureComponent {
  hidePage () {
    anime.remove(this.el);

    return anime({
      targets: this.el,
      opacity: 0,
      duration: 0,
    }).finished;
  }

  animateIn () {
    anime.remove(this.el);

    return anime({
      targets: this.el,
      opacity: [0, 1],
      duration: 1000,
      delay: 1000,
      easing: 'easeOutExpo',
    }).finished;
  }

  animateOut () {
    anime.remove(this.el);
    this.props.showFollow();
    const { showLoader } = this.props;
    showLoader();

    return anime({
      targets: this.el,
      opacity: 0,
      duration: 1000,
      easing: 'easeOutExpo',
    }).finished;
  }

  componentDidMount () {
    this.props.hideLoader();
    this.props.hideFollow();
  }

  render () {
    const { hideLoader, cursorHover, cursorUnhover } = this.props;

    return (
      <div
        id='additiveshader-page' ref={(e) => {
          this.el = e;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <Background />
        <ThreeJS
          hideLoader={hideLoader}
        />
      </div>
    );
  }
}

AdditiveShader.propTypes = {
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  hideFollow: PropTypes.func.isRequired,
  showFollow: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  cursorHover: PropTypes.func.isRequired,
};

export default withTransition(AdditiveShader);
