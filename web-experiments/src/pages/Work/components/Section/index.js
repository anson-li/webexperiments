/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TweenLite } from 'gsap';

import styles from './style.module.scss';

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
    const { id, title, description, date, link, image } = this.props;
    return (
      <Link
        className={styles['section']}
        to={link}
        href={link}
        onMouseEnter={this.hoverSection}
        onMouseLeave={this.unhoverSection}  
      >
        <div
          className={styles["id"]}
          ref={(ref) => { this.id = ref; }}
        >
          {id}
        </div>
        <p className={styles["section-title"]}>{title} • <span className={styles["date"]}>{date}</span>
        </p>
        <div className={styles["section-box"]}>
          <p className={styles["description"]}>{description}</p>
        </div>
        <div className={styles["section-image"]}>
          <div
            className={styles["image"]}
            style={{ backgroundImage: `url(${image})`}}
            ref={(ref) => { this.image = ref; }}
              alt="Project banner" />
        </div>
      </Link>
    );
  }
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Section;
