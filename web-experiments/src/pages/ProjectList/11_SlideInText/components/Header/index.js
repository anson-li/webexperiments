import {
  gsap,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import React, {
  PureComponent,
} from 'react';
import PageLink from '../PageLink';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class Header extends PureComponent {
  componentDidMount () {
    // Template for slide up without any rotations
    const childSplit = new SplitText(this.pageheader, {
      linesClass: 'inview-split-child',
      type: 'lines',
    });
    // eslint-disable-next-line no-new
    new SplitText(this.pageheader, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
    gsap.from(childSplit.lines, {
      delay: 1.8,
      duration: 1.5,
      ease: 'power4',
      stagger: 0.1,
      yPercent: 100,
    });
  }

  render () {
    return (
      <div
        className={styles['page-header']}
        ref={(element) => {
          this.pageheader = element;
        }}>
        <PageLink id='1' text='Projects' />
        <PageLink id='2' text='About' />
        <PageLink id='3' text='Team' />
        <PageLink id='4' text='Journal' />
      </div>
    );
  }
}

export default Header;
