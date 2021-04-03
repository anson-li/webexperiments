import React, { PureComponent } from 'react';
import { gsap, Power4 } from 'gsap';
import { InView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import Underline2 from '../Images/underline-2.png';
import DinosaurBackground from '../Images/dinosaur-background.jpg';

import styles from './style.module.scss';

class Footer extends PureComponent {
  constructor(props) {
    super(props);
    this.onHighlightLink = this.onHighlightLink.bind(this);
    this.slideInUnderline = this.slideInUnderline.bind(this);
  }
  
  componentDidUpdate() {
    if (this.props.timeline) {
      this.props.timeline.to(this.dinosaurmask, { height: "120vh", duration: 20 }, 80);
    }
  }

  onHighlightLink(event) {
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

  slideInUnderline(inView, entry) {
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


  render() {
    const { validateImagesLoaded } = this.props;
    return (
      <div className={`${styles["drumheller-section"]} ${styles["footer"]}`}>
        <div className={styles["drumheller-section-footer"]}>
          <div className={styles["drumheller-fulltext-textblock"]}>
            <div className={styles["footer-text"]}>
              <InView as="div" delay={100} threshold={0.3} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
                Get lost in
              </InView>
              <InView as="div" delay={300} className={styles["left-shifted"]} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
                <span className={styles["drumheller-italic"]} style={{ paddingRight: '35px' }}>the</span>
                <span className={styles["drumheller-outline"]}>
                  wonder
                  <InView as="span" delay={600} className={styles["custom-underline-2"]} triggerOnce onChange={(inView, entry) => this.slideInUnderline(inView, entry)}>
                    <img src={Underline2} onLoad={validateImagesLoaded()} alt="Underline" />
                  </InView>
                </span>
                <br />
              </InView>
              <InView as="div" style={{ lineHeight: '1.3em' }} delay={600} threshold={0.3} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
                of Tyrell
              </InView>
            </div>
          </div>
          <div className={styles["drumheller-redirect"]}>
            <div className={styles["sub-text"]}>
              Discover more
            </div>
            <Link to="/work" href="/work" onMouseEnter={this.onHighlightLink} className={styles["main-text"]}>
              Web Experiments
              <span className={styles["custom-underline-3"]}>
              <img onLoad={validateImagesLoaded()} src={Underline2} alt="Underline" />
              </span>
            </Link>
          </div>
          <div className={styles["drumheller-imagemask"]}>
            <img ref={(e) => { this.dinosaurmask = e; }} onLoad={validateImagesLoaded()} src={DinosaurBackground} alt="Badlands!" /> 
          </div>
        </div>
      </div>
    );
  }
}


export default Footer;
