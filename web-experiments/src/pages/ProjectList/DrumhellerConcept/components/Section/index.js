/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TweenLite, gsap, Power4 } from 'gsap';
import { SplitText } from "gsap/SplitText";
import { InView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import ScrollToExplore from '../Images/scroll-to-explore.svg';
import DinosaurSkull from '../Images/dinosaur-skull.png';

import ImageIntroOne from '../Images/intro-1.jpg';
import ImageIntroTwo from '../Images/intro-2.jpg';

import ImageOneOne from '../Images/section-1-1.jpg';
import VideoOneTwo from '../Images/section-1-2.mp4';
import ImageOneThree from '../Images/section-1-3.jpg';

import ImageTwoOne from '../Images/section-2-1.jpg';
import ImageTwoTwo from '../Images/section-2-2.jpg';
import ImageTwoThree from '../Images/section-2-3.jpg';

import ImageThreeOne from '../Images/section-3-1.jpg';
import ImageThreeTwo from '../Images/section-3-2.jpg';
import ImageThreeThree from '../Images/section-3-3.jpg';

import Underline from '../Images/underline.png';
import Underline2 from '../Images/underline-2.png';

import DinosaurBackground from '../Images/dinosaur-background.jpg';

import './style.scss';

gsap.registerPlugin(SplitText);

class Section extends PureComponent {
  constructor(props) {
    super(props);
    this.hoverSection = this.hoverSection.bind(this);
    this.unhoverSection = this.unhoverSection.bind(this);
    this.animateInDiv = this.animateInDiv.bind(this);
    this.slideInUnderline = this.slideInUnderline.bind(this);
    this.onHighlightLink = this.onHighlightLink.bind(this);
  }

  hoverSection() {
    TweenLite.to(this.id, 0.2, {
      top: '19vh'
    });
    TweenLite.to(this.image, 0.2, {
      scaleX: 1.1,
      scaleY: 1.1
    });
  }

  unhoverSection() {
    TweenLite.to(this.id, 0.2, {
      top: '18vh'
    });
    TweenLite.to(this.image, 0.2, {
      scaleX: 1,
      scaleY: 1
    });
  }

  componentDidUpdate() {
    if (this.props.timeline) {
      this.props.timeline.to(this.imageone, { x: -this.props.scrollDistance * 0.12, duration: 100 }, 0);
      this.props.timeline.to(this.imagetwo, { x: -this.props.scrollDistance * 0.1, duration: 100 }, 0);

      this.props.timeline.to(this.sectiononepartonetop, { x: -this.props.scrollDistance * 0.05, duration: 82 }, 18);
      this.props.timeline.to(this.sectiononepartonetbottom, { x: -this.props.scrollDistance * 0.05, duration: 82 }, 15);

      this.props.timeline.to(this.titleitalic, { x: -this.props.scrollDistance * 0.15, duration: 100 }, 0);
      this.props.timeline.to(this.dinosaurmask, { height: "120vh", duration: 10 }, 90);

      gsap.from('.custom-underline', {
        clipPath: 'inset(0% 100% 0% 0%)',
        duration: 1,
        ease: Power4,
        stagger: 0.5,
      });

      gsap.from('.rotating-logo', {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
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

  animateInDiv(inView, entry) {
    // Slide up when in view
    if (inView) {
      const childSplit = new SplitText(entry.target, {
        type: "lines",
        linesClass: "split-child"
      });
      new SplitText(entry.target, {
        type: "lines",
        linesClass: "split-parent"
      });
      gsap.set(entry.target, {
        opacity: 1,
      });
      gsap.from(childSplit.lines, {
        duration: 1.5,
        yPercent: 100,
        ease: "power4",
        stagger: 0.1,
      });
    } else {
      // Don't show when out of view
      gsap.set(entry.target, {
        opacity: 0
      });
    }
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
    return (
      <>
        <div className="scroll-explore">
          <img className="rotating-logo" src={ScrollToExplore} alt="Scroll to Explore" />
          <img className="skull-logo" src={DinosaurSkull} alt="Dino skull!" />
        </div> 
        <div className="drumheller-section one">
          <div className="drumheller-section-one">
            <div className="drumheller-textblock">
              <div className="text">
                <div className="primary">
                  Our Story
                </div>
                <div className="secondary" ref={(e) => { this.titleitalic = e; }}>
                  <span className="drumheller-italic">at</span>&nbsp;
                  <span className="drumheller-outline">
                    Tyrrell
                    <span className="custom-underline">
                      <img src={Underline} alt="Underline" />
                    </span>
                  </span>
                </div>
              </div>
              <div className="description">
              Set in the rugged Alberta badlands, the Royal Tyrrell Museum of Palaeontology
              displays one of the world's largest collections of dinosaurs.<br/><br/>
              With ever-changing exhibits and self-guided experiences year-round, there is always something new to discover.
              </div>
            </div>
            <div ref={(e) => { this.imagetwo = e; }} className="image-block drumheller-imageblock-two">
              <img src={ImageIntroTwo} alt="Skeleton!" />
              <div className="image-block-description">Tyrannosaurus Rex Skeleton</div>
            </div>
            <div ref={(e) => { this.imageone = e; }} className="image-block drumheller-imageblock-one">
              <img src={ImageIntroOne} alt="Dinosaurs!" />
              <div className="image-block-description">Dinosaurs Recreated for Today</div>
            </div>
          </div>
        </div>
        <div className="drumheller-section two">
          <div className="drumheller-section-two">
            <div className="main-banner">
              <div className="banner-index">01</div>
              <InView as="div" delay={100} triggerOnce className="banner-title" onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                Our Vision
              </InView>
              <InView as="div" delay={1000} triggerOnce className="banner-description" onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                We inspire a lifelong passion for science and foster a better understanding of the past, nurturing stewardship of our changing planet.
              </InView>
              <InView as="div" delay={1000} triggerOnce className="banner-right-hint" onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                <div className="banner-right-hint-title">RIGHT</div>
                <div className="banner-right-hint-description">A ceratopsid skeleton</div>
              </InView>
            </div>
            <div className="fullscreen-image">
              <img src={ImageOneOne} alt="Ceratopsid!" />
            </div>
            <div className="top-video-section">
              <div className="upper-video" ref={(e) => { this.sectiononepartonetop = e; }}>
                <video autoPlay="autoplay" muted={true} loop={true}>
                  <source src={VideoOneTwo} type="video/mp4" />
                </video>
              </div>
              <InView as="div" className="lower-text" ref={(e) => { this.sectiononepartonebottom = e; }} delay={100} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                The Tyrrell is Canada’s only<br />museum dedicated exclusively<br />to the science of palaeontology.
              </InView>
            </div>
            <div className="bottom-image-section">
              <div className="upper-text">
                <InView as="div" className="panel-left" delay={100} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                  “Part of what’s special about the museum is it’s situated in the Badlands, so the surrounding landscape is very rich in Cretaceous Period fossils and a lot of the material that’s found in the museum is Alberta fossil material.
                </InView>
                <InView as="div" className="panel-right" delay={100} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                  I think what’s special about coming here is the landscape, and knowing that what you’re looking at in the museum is so rooted in place and time and connected, and our scientists are doing research.”
                </InView>
              </div>
              <div className="bottom-image">
                <img src={ImageOneThree} alt="Run!" />
              </div>
            </div>
          </div>
        </div>
        <div className="drumheller-section three">
          <div className="drumheller-section-three">
            <div className="main-banner">
              <div className="banner-index">02</div>
              <InView as="div" delay={100} triggerOnce className="banner-title" onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                Our Past
              </InView>
              <InView as="div" delay={1000} triggerOnce className="banner-description" onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                Established in 1985, we celebrate the 3.9 billion year history of life on Earth.
              </InView>
              <InView as="div" delay={1000} triggerOnce className="banner-right-hint" onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                <div className="banner-right-hint-title">RIGHT</div>
                <div className="banner-right-hint-description">A Gorgosaurus fossil</div>
              </InView>
            </div>
            <div className="fullscreen-image">
              <img src={ImageTwoOne} alt="Gorgosaurus!" />
            </div>
            <div className="bottom-image-title">
              <InView as="div" className="upper-text" ref={(e) => { this.sectiononepartonebottom = e; }} delay={100} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                In 1884, Joseph B. Tyrrell stumbled<br />upon a 70-million-year-old<br />dinosaur skull.
              </InView>
              <div className="bottom-image">
                <img src={ImageTwoTwo} alt="Fossils!" />
              </div>
            </div>
            <div className="top-image-description">
              <div className="top-image">
                <img src={ImageTwoThree} alt="Gorgosaurus!" />
              </div>
              <div className="lower-text">
              <InView as="div" className="paragraph-spacing" delay={100} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                The young geologist stumbled upon the treasure deep in the heart of Alberta’s Badlands.
                The carnivorous dinosaur, the first of its species ever found, was later named Albertosaurus Sarcophagus.
              </InView>
              <InView as="div" className="paragraph-spacing" delay={500} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                The excavations continued after Tyrrell’s find – in 1910 American palaeontologist, Barnum Brown,
                from the American Museum of Natural History in New York City, visited the area and over a period
                of five years removed 16 dinosaur specimens, some that were new discoveries.
              </InView>
              <InView as="div" delay={1000} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                When the Museum opened in 1985 it was called the Tyrrell Museum of Palaeontology,
                commemorating Joseph Burr Tyrrell. In 1990, the Museum was granted the "Royal" appellation by Her Majesty Queen Elizabeth II.
                While the Museum is now officially the Royal Tyrrell Museum of Palaeontology,
                it's most often referred to as the Royal Tyrrell Museum.
              </InView>
              </div>
            </div>
          </div>
        </div>
        <div className="drumheller-section four">
          <div className="drumheller-section-four">
            <div className="main-banner">
              <div className="banner-index">03</div>
              <InView as="div" delay={100} triggerOnce className="banner-title" onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                Our Future
              </InView>
              <InView as="div" delay={1000} triggerOnce className="banner-description" onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                We foster an environment of learning and development for future generations.
              </InView>
              <InView as="div" delay={1000} triggerOnce className="banner-right-hint" onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                <div className="banner-right-hint-title">RIGHT</div>
                <div className="banner-right-hint-description">Inspiring creativity</div>
              </InView>
            </div>
            <div className="fullscreen-image">
              <img src={ImageThreeOne} alt="Dinosaur!" />
            </div>
            <div className="top-image-title">
              <div className="top-image">
                <img src={ImageThreeTwo} alt="Dinosaur?" />
              </div>
              <InView as="div" className="lower-text" delay={100} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                New discoveries are made everyday, thanks to the great work at Tyrrell.
              </InView>
            </div>
            <div className="bottom-image-section">
              <div className="upper-text">
                <InView as="div" className="panel-left" delay={100} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                  Every year, new discoveries are made at the<br />
                  Royal Tyrrell Museum that change the landscape of<br />
                  the world of Palaeontology. Most recently, researchers<br />
                  have discovered a brand new Tyrannosaurus species;<br />
                  the first in 50 years.
                </InView>
                <InView as="div" className="panel-right" delay={100} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                  Additionally, the Royal Tyrrell offers an interactive<br />
                  space, where people take part in interactive displays<br />
                  to learn about how the dinosaur ate, moved and<br />
                  interacted with other organisms in its environment.
                </InView>
              </div>
              <div className="bottom-image">
                <img src={ImageThreeThree} alt="Dinosaur!" />
              </div>
            </div>
          </div>
        </div>
        <div className="drumheller-section footer">
          <div className="drumheller-section-footer">
            <div className="drumheller-fulltext-textblock">
              <div className="footer-text">
                <InView as="div" delay={100} threshold={0.3} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                  Get lost in
                </InView>
                <InView as="div" delay={300} className="left-shifted" triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                 <span className="drumheller-italic" style={{ paddingRight: '35px' }}>the</span>
                 <span className="drumheller-outline">
                   wonder
                   <InView as="span" delay={300} className="custom-underline-2" triggerOnce onChange={(inView, entry) => this.slideInUnderline(inView, entry)}>
                      <img src={Underline2} alt="Underline" />
                    </InView>
                  </span>
                 <br />
                </InView>
                <InView as="div" style={{ lineHeight: '1.3em' }} delay={600} threshold={0.3} triggerOnce onChange={(inView, entry) => this.animateInDiv(inView, entry)}>
                  of Tyrell
                </InView>
              </div>
            </div>
            <div className="drumheller-redirect">
              <div className="sub-text">
                Discover more
              </div>
              <Link to="/work" href="/work" onMouseEnter={this.onHighlightLink} className="main-text">
                Web Experiments
                <span className="custom-underline-3">
                <img src={Underline2} alt="Underline" />
                </span>
              </Link>
            </div>
            <div className="drumheller-imagemask">
              <img  ref={(e) => { this.dinosaurmask = e; }} src={DinosaurBackground} alt="Badlands!" /> 
            </div>
          </div>
        </div>
      </>
    );
  }
}

Section.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Section;
