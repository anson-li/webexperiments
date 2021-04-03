import {
  gsap, Power4,
} from 'gsap';
import React, {
  PureComponent,
} from 'react';
import {
  InView,
} from 'react-intersection-observer';
import {
  Link,
} from 'react-router-dom';
import DinosaurBackground from '../Images/dinosaur-background.jpg';
import Underline2 from '../Images/underline-2.png';
import styles from './style.module.scss';

class Footer extends PureComponent {
  constructor (props) {
    super(props);
    this.onHighlightLink = this.onHighlightLink.bind(this);
    this.slideInUnderline = this.slideInUnderline.bind(this);
  }

  componentDidUpdate () {
    if (this.props.timeline) {
      this.props.timeline.to(this.dinosaurmask, {duration: 20,
        height: '120vh'}, 80);
    }
  }

  onHighlightLink (event) {
    const timeline =
      gsap.timeline()
        .to(event.target.firstElementChild, 0.3, {
          clipPath: 'inset(0 0 0 400px)',
        }).set(event.target.firstElementChild, {
          clipPath: 'inset(0 400px 0 0)',
        }).to(event.target.firstElementChild, 0.3, {
          clipPath: 'inset(0 0px 0 0)',
        });
    timeline.play();
  }

  slideInUnderline (inView, entry) {
    // Slide up when in view
    if (inView) {
      gsap.from(entry.target, {
        clipPath: 'inset(0 100% 0% 0%)',
        duration: 1,
        ease: Power4,
      });
    } else {
      // Don't show when out of view
      gsap.set(entry.target, {
        clipPath: 'inset(0 0% 0% 0%)',
      });
    }
  }

  render () {
    const {validateImagesLoaded} = this.props;

    return (
      <div className={`${styles['drumheller-section']} ${styles.footer}`}>
        <div className={styles['drumheller-section-footer']}>
          <div className={styles['drumheller-fulltext-textblock']}>
            <div className={styles['footer-text']}>
              <InView
                as='div' delay={100} onChange={(inView, entry) => {
                  return this.props.animateInDiv(inView, entry);
                }}
                threshold={0.3} triggerOnce>
                Get lost in
              </InView>
              <InView
                as='div' className={styles['left-shifted']} delay={300}
                onChange={(inView, entry) => {
                  return this.props.animateInDiv(inView, entry);
                }} triggerOnce>
                <span className={styles['drumheller-italic']} style={{paddingRight: '35px'}}>the</span>
                <span className={styles['drumheller-outline']}>
                  wonder
                  <InView
                    as='span' className={styles['custom-underline-2']} delay={600}
                    onChange={(inView, entry) => {
                      return this.slideInUnderline(inView, entry);
                    }} triggerOnce>
                    <img alt='Underline' onLoad={validateImagesLoaded()} src={Underline2} />
                  </InView>
                </span>
                <br />
              </InView>
              <InView
                as='div' delay={600} onChange={(inView, entry) => {
                  return this.props.animateInDiv(inView, entry);
                }}
                style={{lineHeight: '1.3em'}} threshold={0.3} triggerOnce>
                of Tyrell
              </InView>
            </div>
          </div>
          <div className={styles['drumheller-redirect']}>
            <div className={styles['sub-text']}>
              Discover more
            </div>
            <Link className={styles['main-text']} href='/work' onMouseEnter={this.onHighlightLink} to='/work'>
              Web Experiments
              <span className={styles['custom-underline-3']}>
                <img alt='Underline' onLoad={validateImagesLoaded()} src={Underline2} />
              </span>
            </Link>
          </div>
          <div className={styles['drumheller-imagemask']}>
            <img
              alt='Badlands!' onLoad={validateImagesLoaded()} ref={(e) => {
                this.dinosaurmask = e;
              }}
              src={DinosaurBackground} />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
