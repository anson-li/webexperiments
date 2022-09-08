import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Background from '../../../common/Background';
import TextLogo from '../../../common/TextLogo';
import WaterfallType from './components/WaterfallType';

class KineticType extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      type: {
        torus: false,
        waterfall: true,
      },
    };
    this.setType = this.setType.bind(this);
    this.getActiveType = this.getActiveType.bind(this);
    this.gui = null;
  }

  setType (prop) {
    const {type} = this.state;
    for (const param in type) {
      if (param) {
        type[param] = prop === param;
      }
    }
    this.setState({type});
    this.forceUpdate();
  }

  getActiveType () {
    const {type} = this.state;
    for (const param in type) {
      if (type[param]) {
        return param;
      }
    }

    return '';
  }

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
        <WaterfallType />
      </div>
    );
  }
}

KineticType.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
};

export default KineticType;
