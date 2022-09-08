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
    this.handleEnterWorkContent = this.handleEnterWorkContent.bind(this);
    this.handleLeaveWorkContent = this.handleLeaveWorkContent.bind(this);
    this.handleFadeIn = this.handleFadeIn.bind(this);
    this.handleCompleteLoadingAnimations = this.handleCompleteLoadingAnimations.bind(this);
    this.bold = props.bold;

    this.childSplit = null;
    this.idSplit = null;
    this.descriptionSplit = null;

    this.tweenText = null;
    this.tweenId = null;
    this.interactionsReady = false;
  }

  componentDidMount () {
    this.interactionsReady = false;
    // eslint-disable-next-line no-new
    new SplitText(this.title, {
      charsClass: 'inview-split-parent',
      type: 'words,chars',
    });
    this.childSplit = new SplitText(this.title, {
      charsClass: 'inview-split-child',
      type: 'words,chars',
    });
    // eslint-disable-next-line no-new
    new SplitText(this.id, {
      charsClass: 'inview-split-parent',
      type: 'words,chars',
    });
    this.idSplit = new SplitText(this.id, {
      charsClass: 'inview-split-child',
      type: 'words,chars',
    });
    // eslint-disable-next-line no-new
    new SplitText(this.description, {
      charsClass: 'inview-split-parent',
      type: 'words,chars',
    });
    this.descriptionSplit = new SplitText(this.description, {
      charsClass: 'inview-split-child',
      type: 'words,chars',
    });
  }

  handleCompleteLoadingAnimations () {
    this.interactionsReady = true;
  }

  handleFadeIn () {
    gsap.from(this.childSplit.chars, {

      // stagger: 0.02,
      delay: 1 + this.props.delay / 5,
      duration: 1,
      ease: 'power4',
      yPercent: 100,
    });
    gsap.from(this.idSplit.chars, {

      // stagger: 0.02,
      delay: 1 + this.props.delay / 5,
      duration: 1,
      ease: 'power4',
      yPercent: 100,
    });
    gsap.from(this.descriptionSplit.chars, {

      // stagger: 0.02,
      delay: 1.25 + this.props.delay / 5,
      duration: 1,
      ease: 'power4',
      yPercent: 100,
    });
  }

  handleLinkMouseEnter () {
    if (this.interactionsReady) {
      if (this.tweenText) {
        this.tweenText.kill();
        this.tweenId.kill();
        this.tweenDescription.kill();
      }
      this.tweenText = TweenLite.to(this.childSplit.chars, 0.2, {
        color: '#ffcc5e',
        stagger: 0.01,
      });
      this.tweenId = TweenLite.to(this.idSplit.chars, 0.2, {
        color: '#ffcc5e',
        stagger: 0.01,
      });
      this.tweenDescription = TweenLite.to(this.descriptionSplit.chars, 0.2, {
        color: '#ffcc5e',
        stagger: 0.01,
      });
      this.props.showDescription(this.props.description);
    }
  }

  handleLinkMouseLeave () {
    if (this.interactionsReady) {
      if (this.tweenText) {
        this.tweenText.kill();
        this.tweenId.kill();
        this.tweenDescription.kill();
      }
      this.tweenText = TweenLite.to(this.childSplit.chars, 0.2, {
        color: this.bold ? '#FFE9B9' : '#FFFFFF',
        stagger: 0.01,
      });
      this.tweenId = TweenLite.to(this.idSplit.chars, 0.2, {
        color: this.bold ? '#FFE9B9' : '#FFFFFF',
        stagger: 0.01,
      });
      this.tweenDescription = TweenLite.to(this.descriptionSplit.chars, 0.2, {
        color: this.bold ? '#FFE9B9' : '#FFFFFF',
        stagger: 0.01,
      });
    }
  }

  handleEnterWorkContent () {
    if (this.interactionsReady) {
      if (this.tweenText) {
        this.tweenText.kill();
        this.tweenId.kill();
        this.tweenDescription.kill();
      }
      this.tweenText = TweenLite.to(this.childSplit.chars, 0.2, {
        color: this.bold ? '#FFE9B9' : '#FFFFFF',
      });
      this.tweenId = TweenLite.to(this.idSplit.chars, 0.2, {
        color: this.bold ? '#FFE9B9' : '#FFFFFF',
      });
      this.tweenDescription = TweenLite.to(this.descriptionSplit.chars, 0.2, {
        color: this.bold ? '#FFE9B9' : '#FFFFFF',
      });
    }
  }

  handleLeaveWorkContent () {
    if (this.interactionsReady) {
      if (this.tweenText) {
        this.tweenText.kill();
        this.tweenId.kill();
        this.tweenDescription.kill();
      }
      this.tweenText = TweenLite.to(this.childSplit.chars, 0.2, {
        color: '#111111',
      });
      this.tweenId = TweenLite.to(this.idSplit.chars, 0.2, {
        color: '#111111',
      });
      this.tweenDescription = TweenLite.to(this.descriptionSplit.chars, 0.2, {
        color: '#111111',
      });
    }
  }

  render () {
    const {id, title, link, technology} = this.props;
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
          className={`${styles['section-title']} ${this.bold ? styles.bold : null}`}
          ref={(ref) => {
            this.title = ref;
          }}>
          {title}
        </div>
        <div
          className={`${styles['section-description']} ${this.bold ? styles.bold : null}`}
          ref={(ref) => {
            this.description = ref;
          }}>
          {technology}
        </div>
      </Link>
    );
  }
}

Section.propTypes = {
  bold: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  showDescription: PropTypes.func.isRequired,
  technology: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Section;
