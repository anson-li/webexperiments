import {
  gsap,
} from 'gsap';
import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger';
import {
  SplitText,
} from 'gsap/SplitText';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import Header from './components/Header';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

class DiagonalAnimated extends PureComponent {
  constructor (props) {
    super(props);
    this.timeline = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
      },
    });
  }

  componentDidMount () {
    ScrollTrigger.refresh();
  }

  render () {
    const {cursorHover, cursorUnhover} = this.props;

    return (
      <div
        className={`${styles['diagonal-animated']}`}
        id='generative-art'
        ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <Header timeline={this.timeline} />
      </div>
    );
  }
}

DiagonalAnimated.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
};

export default DiagonalAnimated;
