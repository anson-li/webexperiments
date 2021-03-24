/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TweenLite } from 'gsap';

import ImageIntroOne from '../Images/intro-1.jpg';
import ImageIntroTwo from '../Images/intro-2.jpg';

import ImageOneOne from '../Images/section-1-1.jpg';
import VideoOneTwo from '../Images/section-1-2.mp4';
import ImageOneThree from '../Images/section-1-3.jpg';

import ImageTwoOne from '../Images/section-2-1.jpg';
import ImageTwoTwo from '../Images/section-2-2.jpg';
import ImageTwoThree from '../Images/section-2-3.jpg';

import ImageThreeOne from '../Images/section-3-1.jpg';

import DinosaurBackground from '../Images/dinosaur-background.jpg';

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
                  Royal Tyrrell
                </div>
                <div className="secondary" ref={(e) => { this.titleitalic = e; }}>
                  <span className="drumheller-italic">Uncover</span> <span className="drumheller-outline">Wonder</span>
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
        <div className="drumheller-section three">
          <div className="drumheller-section-three">
            <div className="main-banner">
              <div className="banner-index">02</div>
              <div className="banner-title">Our Past</div>
              <div className="banner-description">Established in 1985, we celebrate the 3.9 billion year history of life on Earth.</div>
              <div className="banner-right-hint">
                <div className="banner-right-hint-title">RIGHT</div>
                <div className="banner-right-hint-description">A Gorgosaurus fossil</div>
              </div>
            </div>
            <div className="fullscreen-image">
              <img src={ImageTwoOne} alt="Gorgosaurus!" />
            </div>
            <div className="bottom-image-title">
              <div className="upper-text">
                In 1884, Joseph B. Tyrrell stumbled upon a 70-million-year-old dinosaur skull.
              </div>
              <div className="bottom-image">
                <img src={ImageTwoTwo} alt="Fossils!" />
              </div>
            </div>
            <div className="top-image-description">
              <div className="top-image">
                <img src={ImageTwoThree} alt="Gorgosaurus!" />
              </div>
              <div className="lower-text">
              The young geologist stumbled upon the treasure deep in the heart of Alberta’s Badlands.
              The carnivorous dinosaur, the first of its species ever found, was later named Albertosaurus Sarcophagus.
              <br /><br />
              The excavations continued after Tyrrell’s find – in 1910 American palaeontologist, Barnum Brown,
              from the American Museum of Natural History in New York City, visited the area and over a period
              of five years removed 16 dinosaur specimens, some that were new discoveries.
              <br /><br />
              When the Museum opened in 1985 it was called the Tyrrell Museum of Palaeontology,
              commemorating Joseph Burr Tyrrell. In 1990, the Museum was granted the "Royal" appellation by Her Majesty Queen Elizabeth II.
              While the Museum is now officially the Royal Tyrrell Museum of Palaeontology,
              it's most often referred to as the Royal Tyrrell Museum.
              </div>
            </div>
          </div>
        </div>
        <div className="drumheller-section four">
          <div className="drumheller-section-four">
            <div className="main-banner">
              <div className="banner-index">03</div>
              <div className="banner-title">Our Future</div>
              <div className="banner-description">We foster an environment of learning and development for future generations.</div>
              <div className="banner-right-hint">
                <div className="banner-right-hint-title">RIGHT</div>
                <div className="banner-right-hint-description">Inspiring creativity</div>
              </div>
            </div>
            <div className="fullscreen-image">
              <img src={ImageThreeOne} alt="Drawings!" />
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
        <div className="drumheller-section footer">
          <div className="drumheller-section-footer">
            <div className="drumheller-fulltext-textblock">
              <div className="footer-text">
                Get lost in <br />
                &nbsp;&nbsp;<span className="drumheller-italic">the</span> <span className="drumheller-outline">wonder</span><br />
                of Tyrell
              </div>
            </div>
            <div className="drumheller-redirect">
              <div class="sub-text">
                Discover more
              </div>
              <div class="main-text">
                Web Experiments
              </div>
            </div>
            <div className="drumheller-imagemask">
              <img src={DinosaurBackground} alt="Badlands!" /> 
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
