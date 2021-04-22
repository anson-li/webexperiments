import {
  gsap,
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

import './style.scss';

gsap.registerPlugin(SplitText);

class TextLogo extends PureComponent {
  constructor (props) {
    super(props);
    this.handleHoverLogo = this.handleHoverLogo.bind(this);
    this.handleUnhoverLogo = this.handleUnhoverLogo.bind(this);
    this.childSplitTop = null;
    this.childSplitBottom = null;
    this.parentSplitTop = null;
    this.parentSplitBottom = null;
    this.timelineOne = null;
    this.timelineTwo = null;
  }

  componentDidMount () {
    this.childSplitTop = new SplitText(this.texttop, {
      charsClass: 'inview-split-child-1',
      type: 'chars',
    });
    this.childSplitBottom = new SplitText(this.textbottom, {
      charsClass: 'inview-split-child-2',
      type: 'chars',
    });
    this.parentSplitTop = new SplitText(this.texttop, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
    this.parentSplitBottom = new SplitText(this.textbottom, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
  }

  handleHoverLogo () {
    if (!this.timelineOne || !this.timelineOne.isActive()) {
      this.timelineOne = gsap.timeline()
        .from(this.childSplitTop.chars, 0.5, {
          ease: 'power4',
          stagger: 0.1,
          yPercent: 100,
        })
        .set(this.childSplitTop.chars, {
          yPercent: 0,
        });
      this.timelineTwo = gsap.timeline()
        .to(this.childSplitBottom.chars, 0.5, {
          ease: 'power4',
          stagger: 0.1,
          yPercent: -100,
        })
        .set(this.childSplitBottom.chars, {
          yPercent: 0,
        });

      this.timelineOne.play();
      this.timelineTwo.play();
    }
    this.props.hover();
  }

  handleUnhoverLogo () {
    this.props.unhover();
  }

  render () {
    return (
      <Link
        className='d-none d-md-block logo-main'
        href='/work'
        id='logo-main'
        onMouseEnter={this.handleHoverLogo}
        onMouseLeave={this.handleUnhoverLogo}
        to='/work'
      >
        <h1
          className='text-logo'
          ref={(ref) => {
            this.texttop = ref;
          }}
        >
          AWE
        </h1>
        <h1
          className='text-logo'
          ref={(ref) => {
            this.textbottom = ref;
          }}
        >
          AWE
        </h1>
      </Link>
    );
  }
}

TextLogo.propTypes = {
  hover: PropTypes.func,
  unhover: PropTypes.func,
};

TextLogo.defaultProps = {
  hover: () => {},
  unhover: () => {},
};

export default TextLogo;
