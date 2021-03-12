/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

class Section extends PureComponent {

  render() {
    const { title, description, date, link, hover, unhover } = this.props;
    return (
      <section className='section'>
        <h1>{title}</h1>
        <p className="date">{date}</p>
        <div className="section-box">
          <p className="description">{description}</p>
          <Link
            to={link}
            className="link"
            href={link}
            onMouseEnter={hover}
            onMouseLeave={unhover}  
          >
            EXPLORE
          </Link>
        </div>
      </section>
    );
  }
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  hover: PropTypes.func.isRequired,
  unhover: PropTypes.func.isRequired
};

export default Section;
