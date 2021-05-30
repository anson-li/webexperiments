import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Background from '../../../common/Background';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import JellicentObject from './components/JellicentObject';

class Jellicent extends PureComponent {
  componentDidMount () {
    this.animateIn();
  }

  animateIn () {
    this.props.hideLoader();
  }

  animateOut () {
    this.props.showLoader();
  }

  render () {
    const {hideLoader, cursorHover, cursorUnhover, transitionStatus} = this.props;

    return (
      <div
        className={transitionStatus}
        id='main-page' ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <Background />
        <JellicentObject
          hideLoader={hideLoader}
        />
      </div>
    );
  }
}

Jellicent.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  transitionStatus: PropTypes.string.isRequired,
};

export default WithTransition(Jellicent);
