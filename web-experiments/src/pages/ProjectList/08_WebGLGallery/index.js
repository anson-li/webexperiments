import anime from 'animejs';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import MultiplePlanes from './components/MultiplePlanes';
import './style.scss';

class WebGLGallery extends PureComponent {
  componentDidMount () {
    this.props.hideLoader();
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
    const {cursorHover, cursorUnhover} = this.props;

    return (
      <div
        id='main-page'
        ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <MultiplePlanes />
      </div>
    );
  }
}

WebGLGallery.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

export default WithTransition(WebGLGallery);
