import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Background from '../../../common/Background';
import TextLogo from '../../../common/TextLogo';
import JellicentObject from './components/JellicentObject';

class Jellicent extends PureComponent {
  render () {
    const {cursorHover, cursorUnhover} = this.props;

    return (
      <div
        id='main-page' ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <Background />
        <JellicentObject />
      </div>
    );
  }
}

Jellicent.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
};

export default Jellicent;
