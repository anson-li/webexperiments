import {
  TweenLite, gsap,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Link,
} from 'react-router-dom';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class Section extends PureComponent {
  constructor (props) {
    super(props);
    this.handleLinkMouseEnter = this.handleLinkMouseEnter.bind(this);
    this.handleLinkMouseLeave = this.handleLinkMouseLeave.bind(this);

    this.childSplit = null;
  }

  componentDidMount () {
    // eslint-disable-next-line no-new
    new SplitText(this.title, {
      charsClass: 'inview-split-parent',
      type: 'words,chars',
    });
    this.childSplit = new SplitText(this.title, {
      charsClass: 'inview-split-child',
      type: 'words,chars',
    });
  }

  handleFadeIn () {
    gsap.set(this.childSplit.chars, {
      perspective: 400,
    });
    gsap.from(this.childSplit.chars, {
      delay: 0.5 + this.props.delay / 5,
      duration: 1.5,
      ease: 'power4',
      stagger: 0.05,
      yPercent: 100,
    });
  }

  handleLinkMouseEnter () {
    TweenLite.to(this.childSplit.chars, 0.2, {
      color: '#ffcc5e',
      stagger: 0.01,
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
  }

  handleLinkMouseLeave () {
    TweenLite.to(this.childSplit.chars, 0.2, {
      color: '#666666',
      stagger: 0.01,
    });
    TweenLite.to(this.id, 0.2, {
      color: '#666666',
      top: '18vh',
    });
    TweenLite.to(this.image, 0.2, {
      scaleX: 1,
      scaleY: 1,
    });
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
        <div
          className={styles['section-title']}
          ref={(ref) => {
            this.title = ref;
          }}>
          {title}
        </div>
      </Link>
    );
  }
}

Section.propTypes = {
  delay: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  showDescription: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Section;
