/* eslint-disable no-return-assign */
import {
  TweenLite,
} from 'gsap';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Link,
} from 'react-router-dom';
import styles from './style.module.scss';

class Section extends PureComponent {
  constructor (props) {
    super(props);
    this.hoverSection = this.hoverSection.bind(this);
    this.unhoverSection = this.unhoverSection.bind(this);
  }

  hoverSection () {
    TweenLite.to(this.id, 0.2, {
      top: '19vh',
    });
    TweenLite.to(this.image, 0.2, {
      scaleX: 1.1,
      scaleY: 1.1,
    });
  }

  unhoverSection () {
    TweenLite.to(this.id, 0.2, {
      top: '18vh',
    });
    TweenLite.to(this.image, 0.2, {
      scaleX: 1,
      scaleY: 1,
    });
  }

  render () {
    const {id, title, description, date, link, image} = this.props;

    return (
      <Link
        className={styles.section}
        href={link}
        onMouseEnter={this.hoverSection}
        onMouseLeave={this.unhoverSection}
        to={link}
      >
        <div
          className={styles.id}
          ref={(ref) => {
            this.id = ref;
          }}
        >
          {id}
        </div>
        <p className={styles['section-title']}>{title} • <span className={styles.date}>{date}</span>
        </p>
        <div className={styles['section-box']}>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles['section-image']}>
          <div
            alt='Project banner'
            className={styles.image}
            ref={(ref) => {
              this.image = ref;
            }}
            style={{backgroundImage: `url(${image})`}} />
        </div>
      </Link>
    );
  }
}

Section.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Section;
