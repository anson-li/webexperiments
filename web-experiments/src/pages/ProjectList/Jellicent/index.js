import React, { PureComponent } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';

import Background from '../../../common/Background';
import JellicentObject from './components/JellicentObject';
import withTransition from '../../../common/WithTransition';
import TextLogo from '../../../common/TextLogo';

class Jellicent extends PureComponent {
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

  render() {
    const { hideLoader, cursorHover, cursorUnhover } = this.props;
    return (
      <div id="main-page" ref={(e) => { this.el = e; }}>
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
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  cursorHover: PropTypes.func.isRequired,
};

export default withTransition(Jellicent);
