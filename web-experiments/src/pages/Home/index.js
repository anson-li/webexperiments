/* eslint-disable no-return-assign */
import anime from 'animejs';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Background from '../../common/Background';
import ThreeSphere from './components/ThreeSphere';
import MainText from './components/MainText';

import withTransition from '../../common/WithTransition';

class Home extends PureComponent {
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
    const { hideLoader } = this.props;
    return (
      <div id="main-page" ref={(e) => { this.el = e; }}>
        <Background />
        <div className="fixed">
          <ThreeSphere
            hideLoader={hideLoader}
          />
          <MainText />
        </div>
        <div id="bottom" />
      </div>
    );
  }
}

Home.propTypes = {
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
};

export default withTransition(Home);
