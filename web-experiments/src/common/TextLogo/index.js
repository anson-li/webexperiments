import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

class TextLogo extends PureComponent {
  render() {
    return (
      <Link
        to="/"
        id="logo-main"
        className="d-none d-md-block logo-main"
        href="/"
        onMouseEnter={this.props.hover}
        onMouseLeave={this.props.unhover}
      >
         <h1 className="text-logo">AWE.</h1>
      </Link>
    );
  }
}

TextLogo.propTypes = {
  hover: PropTypes.func,
  unhover: PropTypes.func,
};

TextLogo.defaultProps = {
  hover: () => {},
  unhover: () => {},
}


export default TextLogo;
