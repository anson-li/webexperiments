/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

class Section extends PureComponent {

  render() {
    const { id, title, description, date, link, hover, unhover } = this.props;
    return (
      <section
        className='section'
        to={link}
        href={link}
        onMouseEnter={hover}
        onMouseLeave={unhover}  
      >
        <div className="id">{id}</div>
        <p className="section-title">{title}</p>
        <div className="section-box">
          <p className="description">{description}</p>
        </div>
        <div className="section-image" />
        <p className="date">{date}</p>
      </section>
    );
  }
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  hover: PropTypes.func.isRequired,
  unhover: PropTypes.func.isRequired
};

export default Section;
