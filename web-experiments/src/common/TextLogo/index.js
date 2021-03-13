import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TweenLite } from 'gsap';

import './style.scss';

class TextLogo extends PureComponent {
  constructor(props) {
    super(props);
    this.hoverLogo = this.hoverLogo.bind(this);
    this.unhoverLogo = this.unhoverLogo.bind(this);
  }

  hoverLogo() {
    TweenLite.to(this.text, 0.2, {
      scaleX: 1.05,
      scaleY: 1.05
    });
    this.props.hover();
  }

  unhoverLogo() {
    TweenLite.to(this.text, 0.2, {
      scaleX: 1,
      scaleY: 1
    });
    this.props.unhover();
  }


  render() {
    return (
      <Link
        to="/"
        id="logo-main"
        className="d-none d-md-block logo-main"
        href="/"
        onMouseEnter={this.hoverLogo}
        onMouseLeave={this.unhoverLogo}
      >
        <h1
          className="text-logo"
          ref={(ref) => { this.text = ref; }}
        >
          AWE.
        </h1>
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
