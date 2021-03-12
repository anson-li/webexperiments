/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomCursor from './common/CustomCursor';

import Border from './common/Border';
import Loader from './common/Loader';

class App extends PureComponent {
  constructor(props) {
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

  onCursorHover() {
    this.cursor.current.hoverFunc();
  };

  onCursorUnhover() {
    this.cursor.current.unhoverFunc();
  }

  matchPath = (path) => matchPath(window.location.pathname, path);

  showLoader() {
    this.loader.current.fadeIn();
  }

  hideLoader() {
    this.loader.current.fadeOut();
  }

  hideFollow() {
    this.cursor.current.hideFollow();
  }

  showFollow() {
    this.cursor.current.showFollow();
  }

  render() {
    const { routes } = this.props;
    return (
      <div id="app">
        <CustomCursor ref={this.cursor} />
        <div className="fixed-header">
          <Border />
        </div>
        <Loader ref={this.loader} />
        <TransitionGroup id="content">
          { routes
            .filter(({ path }) => this.matchPath(path))
            .map(({ Component, key }) => (
              <Component
                key={key}
                showLoader={this.showLoader}
                hideLoader={this.hideLoader}
                cursorHover = {this.onCursorHover}
                cursorUnhover = {this.onCursorUnhover}
                hideFollow = {this.hideFollow}
                showFollow = {this.showFollow}
              />
            ))}
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
