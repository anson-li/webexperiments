import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Background from '../../common/Background';
import BubbleLink from '../../common/BubbleLink';
import TextLogo from '../../common/TextLogo';
import ThreeSphere from './components/ThreeSphere';

class Home extends PureComponent {
  componentDidMount () {
    this.props.hideFollow();
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
        <ThreeSphere
          hideLoader={hideLoader}
        />
      </div>
    );
  }
}

Home.propTypes = {
  hideFollow: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
};

export default Home;
