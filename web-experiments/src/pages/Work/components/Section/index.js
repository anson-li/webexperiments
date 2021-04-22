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
    this.handleLinkMouseEnter = this.handleLinkMouseEnter.bind(this);
    this.handleLinkMouseLeave = this.handleLinkMouseLeave.bind(this);
  }

  handleLinkMouseEnter () {
    TweenLite.to(this.title, 0.2, {
      color: '#ffcc5e',
    });
    TweenLite.to(this.id, 0.2, {
      color: '#ffcc5e',
      top: '19vh',
    });
    TweenLite.to(this.image, 0.2, {
      scaleX: 1.1,
      scaleY: 1.1,
    });
    TweenLite.to(this.bannerlink, 0.1, {
      color: '#ffd5a8',
    });
    this.props.showDescription(this.props.description);
    this.props.hover();
  }

  handleLinkMouseLeave () {
    TweenLite.to(this.title, 0.2, {
      color: '#999999',
    });
    TweenLite.to(this.id, 0.2, {
      color: '#999999',
      top: '18vh',
    });
    TweenLite.to(this.image, 0.2, {
      scaleX: 1,
      scaleY: 1,
    });
    this.props.unhover();
  }

  render () {
    const {id, title, link} = this.props;
    const formattedId = id < 10 ? `0${id}` : id;

    return (
      <Link
        className={styles.section}
        href={link}
        onMouseEnter={this.handleLinkMouseEnter}
        onMouseLeave={this.handleLinkMouseLeave}
        to={link}
      >
        <div
          className={styles.id}
          ref={(ref) => {
            this.id = ref;
          }}
        >
          {formattedId}
        </div>
        <p
          className={styles['section-title']}
          ref={(ref) => {
            this.title = ref;
          }}>
          {title}
        </p>
      </Link>
    );
  }
}

Section.propTypes = {
  description: PropTypes.string.isRequired,
  hover: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  showDescription: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  unhover: PropTypes.func.isRequired,
};

export default Section;
