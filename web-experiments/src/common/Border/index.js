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
              <Link to="/work" href="/work" className="menu-item strikethrough top-item">Experiments</Link>
              <a href="http://anson.li/resume" className="menu-item strikethrough top-item">Resume</a>
              <a href="https://github.com/anson-li" className="menu-item strikethrough top-item">Github</a>
              <a href="https://www.linkedin.com/in/anson-ii" className="menu-item strikethrough top-item">LinkedIn</a>
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
