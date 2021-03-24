/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TweenLite } from 'gsap';

import ImageIntroOne from '../Images/intro-1.jpg';
import ImageIntroTwo from '../Images/intro-2.jpg';

import ImageOneOne from '../Images/section-1-1.jpg';
import VideoOneTwo from '../Images/section-1-2.mp4';
import ImageOneThree from '../Images/section-1-3.jpg';

import './style.scss';

class Section extends PureComponent {
  constructor(props) {
    super(props);
    this.hoverSection = this.hoverSection.bind(this);
    this.unhoverSection = this.unhoverSection.bind(this);
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
    console.log(this.props);
    if (this.props.timeline) {
      this.props.timeline.to(this.imageone, { x: -this.props.scrollDistance * 0.12, duration: 100 }, 0);
      this.props.timeline.to(this.imagetwo, { x: -this.props.scrollDistance * 0.1, duration: 100 }, 0);
      this.props.timeline.to(this.titleitalic, { x: -this.props.scrollDistance * 0.15, duration: 100 }, 0);
    }
  }

  render() {
    const { text } = this.props;
    return (
      <>
        <div className="drumheller-section one">
          <div className="drumheller-section-one">
            <div className="drumheller-textblock">
              <div className="text">
                <div className="primary">
                  Royal Tyrell
                </div>
                <div className="secondary" ref={(e) => { this.titleitalic = e; }}>
                  <span className="drumheller-italic">Uncover</span> <span className="drumheller-outline">Wonder</span>
                </div>
              </div>
              <div className="description">
              Set in the rugged Alberta badlands, the Royal Tyrrell Museum of Palaeontology
              displays one of the world"s largest collections of dinosaurs.<br/><br/>
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
              <div className="banner-title">Our Vision</div>
              <div className="banner-description">We inspire a lifelong passion for science and foster a better understanding of the past, nurturing stewardship of our changing planet.</div>
              <div className="banner-right-hint">
                <div className="banner-right-hint-title">RIGHT</div>
                <div className="banner-right-hint-description">A ceratopsid skeleton</div>
              </div>
            </div>
            <div className="fullscreen-image">
              <img src={ImageOneOne} alt="Ceratopsid!" />
            </div>
            <div className="top-video-section">
              <div className="upper-video">
                <video autoplay="autoplay" muted="true" loop="true">
                  <source src={VideoOneTwo} type="video/mp4" />
                </video>
              </div>
              <div className="lower-text">
                The Tyrrell is Canada’s only museum dedicated exclusively to the science of palaeontology.
              </div>
            </div>
            <div className="bottom-image-section">
              <div className="upper-text">
                <div className="panel-left">
                “Part of what’s special about the museum is it’s situated in the Badlands, so the surrounding landscape is very rich in Cretaceous Period fossils and a lot of the material that’s found in the museum is Alberta fossil material.
                </div>
                <div className="panel-right">
                I think what’s special about coming here is the landscape, and knowing that what you’re looking at in the museum is so rooted in place and time and connected, and our scientists are doing research on the materials.”
                </div>
              </div>
              <div className="bottom-image">
                <img src={ImageOneThree} alt="Run!" />
              </div>
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
