import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import MultiplePlanes from './components/MultiplePlanes';

class WebGLGallery extends PureComponent {
  componentDidMount () {
    this.el = null;
  }

  animateIn () {
    this.props.hideLoader();
  }

  animateOut () {
    this.props.showLoader();
  }

  render () {
    const {cursorHover, cursorUnhover, hideLoader, transitionStatus} = this.props;

    return (
      <div
        className={transitionStatus}
        id='main-page'
        ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <MultiplePlanes
          hideLoader={hideLoader}
        />
      </div>
    );
  }
}

WebGLGallery.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  transitionStatus: PropTypes.string.isRequired,
};

export default WebGLGallery;
