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
import DiagonalBox from './components/DiagonalBox';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class Header extends PureComponent {
  componentDidMount () {
    const {timeline} = this.props;
    if (timeline) {
      timeline.to(this.header, {
        opacity: 0,
      }, 0);
      timeline.to(this.subheader, {
        opacity: 0,
      }, 0);
    }
  }

  render () {
    const {timeline} = this.props;

    return (
      <>
        <div
          className={styles['page-header']}
          ref={(element) => {
            this.pageheader = element;
          }}>
          <div
            className={styles['header-text']}
            ref={(element) => {
              this.header = element;
            }}>
            Engineering the Future
          </div>
          <div
            className={styles['header-subtext']}
            ref={(element) => {
              this.subheader = element;
            }}>
            We strive for creativity-fuelled impact
          </div>
          <div className={`${styles.boxes}`}>
            <DiagonalBox delay={0} timeline={timeline} />
            <DiagonalBox delay={1} timeline={timeline} />
            <DiagonalBox delay={2} timeline={timeline} />
            <DiagonalBox delay={3} timeline={timeline} />
            <DiagonalBox delay={4} timeline={timeline} />
            <DiagonalBox delay={5} timeline={timeline} />
            <DiagonalBox delay={6} timeline={timeline} />
            <DiagonalBox delay={7} timeline={timeline} />
            <DiagonalBox delay={8} timeline={timeline} />
            <DiagonalBox delay={9} timeline={timeline} />
          </div>
        </div>
      </>
    );
  }
}

Header.propTypes = {
  timeline: PropTypes.object.isRequired,
};

export default Header;
