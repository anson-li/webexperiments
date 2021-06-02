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
};

export default WebGLGallery;
