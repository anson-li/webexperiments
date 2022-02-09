import {
  GUI,
} from 'dat.gui';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Background from '../../../common/Background';
import TextLogo from '../../../common/TextLogo';
import TorusType from './components/TorusType';
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

  componentDidMount () {
    // Timeout on GUI to account to prevent early pop in
    this.renderGui();
  }

  componentWillUnmount () {
    this.gui.destroy();
  }

  renderGui () {
    this.gui = new GUI();
    this.gui.width = 500;
    this.gui.closed = false;

    const type = this.gui.addFolder('Type');
    type.add(this.state.type, 'torus').name('Torus').listen().onChange(() => {
      this.setType('torus');
    });
    type.add(this.state.type, 'waterfall').name('Waterfall').listen().onChange(() => {
      this.setType('waterfall');
    });
    type.open();
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
    const type = this.getActiveType();

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
        {
          {
            torus: <TorusType />,
            waterfall: <WaterfallType />,
          }[type]
        }
      </div>
    );
  }
}

KineticType.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
};

export default KineticType;
