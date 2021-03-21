/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TweenLite } from 'gsap';

import './style.scss';

class Section extends PureComponent {
  constructor(props) {
    super(props);
    this.hoverSection = this.hoverSection.bind(this);
    this.unhoverSection = this.unhoverSection.bind(this);
  }

  hoverSection() {
    TweenLite.to(this.id, 0.2, {
      top: '19vh'
    });
    TweenLite.to(this.image, 0.2, {
      scaleX: 1.1,
      scaleY: 1.1
    });
  }

  unhoverSection() {
    TweenLite.to(this.id, 0.2, {
      top: '18vh'
    });
    TweenLite.to(this.image, 0.2, {
      scaleX: 1,
      scaleY: 1
    });
  }

  render() {
    const { text } = this.props;
    return (
      <div className='drumheller-section'>
        <div className="text">
          <div className="primary">
            Drumheller
          </div>
          <div className="secondary">
            <span className="drumheller-italic">Uncover</span> <span className="drumheller-outline">Wonder</span>
          </div>
        </div>
      </div>
    );
  }
}

Section.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Section;
