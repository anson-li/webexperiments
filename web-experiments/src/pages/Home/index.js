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
  componentDidMount () {
    this.props.hideFollow();
  }

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
    this.props.showFollow();
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
    const {hideLoader} = this.props;

    return (
      <div
        id='main-page' ref={(element) => {
          this.el = element;
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
  hideFollow: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showFollow: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

export default withTransition(Home);
