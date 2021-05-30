import {
  gsap,
} from 'gsap';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import styles from './style.module.scss';

class PageLink extends PureComponent {
  constructor (props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter () {
    gsap.to(this.underline, 0.4, {
      width: '60%',
    });
  }

  handleMouseLeave () {
    gsap.to(this.underline, 0.4, {
      width: '0%',
    });
  }

  render () {
    const {id, text} = this.props;

    return (
      <div
        className={styles['page-header-link']}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles['page-header-link-id']}>{id}</div>
        <div className={styles['page-header-link-text']}>{text}</div>
        <span
          className={styles.underline}
          ref={(element) => {
            this.underline = element;
          }} />
      </div>
    );
  }
}

PageLink.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default PageLink;
