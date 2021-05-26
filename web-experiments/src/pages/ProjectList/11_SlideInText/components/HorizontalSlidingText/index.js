import {
  gsap, TimelineMax,
} from 'gsap';
import React, {
  PureComponent,
} from 'react';
import styles from './style.module.scss';

class HorizontalSlidingText extends PureComponent {
  constructor () {
    super();
    this.scrollList = [
      {
        ref: null,
        text: 'Functional &',
      },
      {
        ref: null,
        text: 'Artificial &',
      },
      {
        ref: null,
        text: 'Designation &',
      },
      {
        ref: null,
        text: 'Design &',
      },
      {
        ref: null,
        text: 'Flawless &',
      },
    ];

    this.handleLinkMouseEnter = this.handleLinkMouseEnter.bind(this);
    this.handleLinkMouseLeave = this.handleLinkMouseLeave.bind(this);
  }

  componentDidMount () {
    let listWidth = 0;
    const time = 36;
    this.scrollList.forEach((item) => {
      listWidth += item.ref.clientWidth;
    });

    // Add additional end padding to fit everything on one line
    listWidth += 50;

    gsap.set(this.list, {
      width: `${listWidth}px`,
    });
    gsap.set(this.clonedlist, {
      width: `${listWidth}px`,
    });
    const tl = new TimelineMax({force3D: true,
      repeat: -1});
    tl.fromTo(this.list, time, {
      x: 0,
    }, {
      ease: 'none',
      x: -listWidth,
    }, 0);
    tl.fromTo(this.clonedlist, time, {
      x: listWidth,
    }, {
      ease: 'none',
      x: 0,
    }, 0);
    tl.set(this.list, {
      x: listWidth,
    });
    tl.to(this.clonedlist, time, {
      ease: 'none',
      x: -listWidth,
    }, time);
    tl.to(this.list, time, {
      ease: 'none',
      x: 0,
    }, time);
  }

  handleLinkMouseEnter (event) {
    gsap.to(event.target, 0.2, {
      opacity: 1,
    });
  }

  handleLinkMouseLeave (event) {
    gsap.to(event.target, 0.2, {
      opacity: 0.5,
    });
  }

  render () {
    return (
      <div
        className={styles['horizontal-sliding-text-wrapper']}
        ref={(element) => {
          this.wrapper = element;
        }}>
        <div
          className={styles['horizontal-slider-list']}
          ref={(element) => {
            this.list = element;
          }}>
          { this.scrollList.map((object, index) => {
            const key = `${index}-list-item`;

            return (
              <div
                className={styles.box}
                key={key}
                onMouseEnter={this.handleLinkMouseEnter}
                onMouseLeave={this.handleLinkMouseLeave}
                ref={(ref) => {
                  this.scrollList[index].ref = ref;
                }}
              >
                {object.text}
              </div>
            );
          })}
        </div>
        <div
          className={`${styles['horizontal-slider-list']} ${styles.cloned}`}
          ref={(element) => {
            this.clonedlist = element;
          }}>
          { this.scrollList.map((object, index) => {
            const key = `${index}-list-item`;

            return (
              <div
                className={styles.box}
                key={key}
                onMouseEnter={this.handleLinkMouseEnter}
                onMouseLeave={this.handleLinkMouseLeave}
                ref={(ref) => {
                  this.scrollList[index].ref = ref;
                }}
              >
                {object.text}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HorizontalSlidingText;
