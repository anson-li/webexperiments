import React, { PureComponent } from 'react';
import WOW from 'wowjs';
import { Link } from 'react-router-dom';

import FadeText from '../../../../common/FadeText';

class MainText extends PureComponent {
  componentDidMount() {
    new WOW.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: false,
    }).init();
  }

  render() {
    return (
      <div className="full-page">
        <div className="flex-container container ">
          <div className="col-md-12 mid-center">
            <div className="spacer-sm d-lg-none" />
            <FadeText
              type="h1"
              id="main-text"
              text="ANSON'S WEB EXPERIMENTS"
            />
            <Link to="/work" id="sub-link" href="work">
              <FadeText
                type="h6"
                id="sub-text"
                className="strikethrough"
                text="Let's take a look →"
                base={1800}
              />
            </Link>
          </div>
        </div>
        <div className="col-md-12 fixed-bottom">
          <p className="item">
            <span className="serif wow fadeIn d-none d-lg-block" data-wow-duration="1s" data-wow-delay="0.5s">hello@anson.li</span>
          </p>
        </div>
      </div>
    );
  }
}

export default MainText;
