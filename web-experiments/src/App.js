/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  matchPath,
} from 'react-router-dom';
import {
  TransitionGroup,
} from 'react-transition-group';
import Border from './common/Border';
import CustomCursor from './common/CustomCursor';
import Loader from './common/Loader';
import MobilePageOverlay from './common/MobilePageOverlay';

class App extends PureComponent {
  constructor (props) {
    super(props);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.loader = React.createRef();
    this.onCursorHover = this.onCursorHover.bind(this);
    this.onCursorUnhover = this.onCursorUnhover.bind(this);
    this.cursor = React.createRef();
    this.hideFollow = this.hideFollow.bind(this);
    this.showFollow = this.showFollow.bind(this);
  }

  onCursorHover () {
    this.cursor.current.hoverFunc();
  }

  onCursorUnhover () {
    this.cursor.current.unhoverFunc();
  }

  matchPath = (path) => {
    return matchPath(window.location.pathname, path);
  };

  showLoader () {
    this.loader.current.fadeIn();
  }

  hideLoader () {
    if (this.loader.current) {
      this.loader.current.fadeOut();
    }
  }

  hideFollow () {
    this.cursor.current.hideFollow();
  }

  showFollow () {
    this.cursor.current.showFollow();
  }

  render () {
    const {routes} = this.props;

    return (
      <div id='app'>
        <MobilePageOverlay />
        <CustomCursor ref={this.cursor} />
        <div className='fixed-header'>
          <Border />
        </div>
        <Loader ref={this.loader} />
        <TransitionGroup id='content'>
          { routes
            .filter(({path}) => {
              return this.matchPath(path);
            })
            .map(({Component, key}) => {
              return <Component
                cursorHover={this.onCursorHover}
                cursorUnhover={this.onCursorUnhover}
                hideFollow={this.hideFollow}
                hideLoader={this.hideLoader}
                key={key}
                showFollow={this.showFollow}
                showLoader={this.showLoader}
              />;
            })}
        </TransitionGroup>
      </div>
    );
  }
}

App.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  routes: [],
};

export default App;
