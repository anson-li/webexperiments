import React, { PureComponent } from 'react';
import './style.scss';

class MobilePageOverlay extends PureComponent {
  render() {
    return (
      <div className="mobile-overlay">
        <p>
          Hey! Sorry, but you're viewing this from
          a view that's a bit too small for our web experiments.
          In the meantime, please check out these links for more
          from me: <br /><br />
          <a href="http://anson.li/resume">Resume</a><br /><br />
          <a href="https://github.com/anson-li">Github</a><br /><br />
          <a href="https://www.linkedin.com/in/anson-ii">LinkedIn</a>
        </p>
      </div>
    );
  }
}

export default MobilePageOverlay;
