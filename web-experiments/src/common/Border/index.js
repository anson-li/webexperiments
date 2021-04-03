import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Border extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleMenu: false,
    };
    this.renderStandard = this.renderStandard.bind(this);
  }

  renderStandard() {
    return (
      <div>
        <div id="bottom">
          <div className="col-md-12 top-center d-none d-sm-block">
            <h5 className="connect">
              <Link className="menu-item strikethrough top-item" href="/work" to="/work">Experiments</Link>
              <a className="menu-item strikethrough top-item" href="http://anson.li/resume">Resume</a>
              <a className="menu-item strikethrough top-item" href="https://github.com/anson-li">Github</a>
              <a className="menu-item strikethrough top-item" href="https://www.linkedin.com/in/anson-ii">LinkedIn</a>
            </h5>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderStandard()}
      </div>
    );
  }
}

export default Border;
