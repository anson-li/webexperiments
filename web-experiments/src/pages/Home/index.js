/* eslint-disable no-return-assign */
import anime from 'animejs';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Background from '../../common/Background';
import BubbleLink from '../../common/BubbleLink';
import TextLogo from '../../common/TextLogo';
import withTransition from '../../common/WithTransition';
import ThreeSphere from './components/ThreeSphere';

class Home extends PureComponent {
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
    this.props.hideFollow();
  }

  render () {
    const { hideLoader } = this.props;

    return (
      <div
        id='main-page' ref={(e) => {
          this.el = e;
        }}>
        <TextLogo />
        <BubbleLink
          text='EXPLORE'
        />
        <Background />
        <div className='fixed'>
          {/* <MainText /> */}
        </div>
        <ThreeSphere
          hideLoader={hideLoader}
        />
        {/* <div id="bottom" /> */}
      </div>
    );
  }
}

Home.propTypes = {
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  hideFollow: PropTypes.func.isRequired,
  showFollow: PropTypes.func.isRequired,
};

export default withTransition(Home);
