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
    this.hoverLogo = this.hoverLogo.bind(this);
    this.unhoverLogo = this.unhoverLogo.bind(this);
    this.childSplitTop = null;
    this.childSplitBottom = null;
    this.parentSplitTop = null;
    this.parentSplitBottom = null;
    this.timelineOne = null;
    this.timelineTwo = null;
  }

  componentDidMount () {
    this.childSplitTop = new SplitText(this.texttop, {
      type: 'chars',
      charsClass: 'inview-split-child-1',
    });
    this.childSplitBottom = new SplitText(this.textbottom, {
      type: 'chars',
      charsClass: 'inview-split-child-2',
    });
    this.parentSplitTop = new SplitText(this.texttop, {
      type: 'lines',
      linesClass: 'inview-split-parent',
    });
    this.parentSplitBottom = new SplitText(this.textbottom, {
      type: 'lines',
      linesClass: 'inview-split-parent',
    });
  }

  hoverLogo () {
    if (!this.timelineOne || !this.timelineOne.isActive()) {
      this.timelineOne = gsap.timeline()
        .from(this.childSplitTop.chars, 0.5, {
          yPercent: 100,
          ease: 'power4',
          stagger: 0.1,
        })
        .set(this.childSplitTop.chars, {
          yPercent: 0,
        });
      this.timelineTwo = gsap.timeline()
        .to(this.childSplitBottom.chars, 0.5, {
          yPercent: -100,
          ease: 'power4',
          stagger: 0.1,
        })
        .set(this.childSplitBottom.chars, {
          yPercent: 0,
        });

      this.timelineOne.play();
      this.timelineTwo.play();
    }
    this.props.hover();
  }

  unhoverLogo () {
    this.props.unhover();
  }

  render () {
    return (
      <Link
        className='d-none d-md-block logo-main'
        href='/'
        id='logo-main'
        onMouseEnter={this.hoverLogo}
        onMouseLeave={this.unhoverLogo}
        to='/'
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
