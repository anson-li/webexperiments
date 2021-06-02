import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Background from '../../../common/Background';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import ThreeJS from './components/ThreeJS';

class CoffeeCup extends PureComponent {
  componentDidMount () {
    this.animateIn();
  }

  animateIn () {
    this.props.hideLoader();
    this.props.hideFollow();
  }

  animateOut () {
    this.props.showLoader();
    this.props.showFollow();
  }

  render () {
    const {hideLoader, cursorHover, cursorUnhover, transitionStatus} = this.props;

    return (
      <div
        className={transitionStatus}
        id='additiveshader-page' ref={(event) => {
          this.el = event;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <Background />
        <ThreeJS
          hideLoader={hideLoader}
        />
      </div>
    );
  }
}

CoffeeCup.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideFollow: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showFollow: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  transitionStatus: PropTypes.string.isRequired,
};

export default WithTransition(CoffeeCup);
