import anime from 'animejs';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Background from '../../../common/Background';
import TextLogo from '../../../common/TextLogo';
import withTransition from '../../../common/WithTransition';
import JellicentObject from './components/JellicentObject';

class Jellicent extends PureComponent {
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
    const {hideLoader, cursorHover, cursorUnhover} = this.props;

    return (
      <div
        id='main-page' ref={(e) => {
          this.el = e;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <Background />
        <JellicentObject
          hideLoader={hideLoader}
        />
      </div>
    );
  }
}

Jellicent.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

export default withTransition(Jellicent);
