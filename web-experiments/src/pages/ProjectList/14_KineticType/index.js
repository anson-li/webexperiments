import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Background from '../../../common/Background';
import TextLogo from '../../../common/TextLogo';
import ThreeJS from './components/ThreeJS';

class KineticType extends PureComponent {
  render () {
    const {cursorHover, cursorUnhover} = this.props;

    return (
      <div
        id='kinetictype-page' ref={(event) => {
          this.el = event;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <Background />
        <ThreeJS />
      </div>
    );
  }
}

KineticType.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
};

export default KineticType;
