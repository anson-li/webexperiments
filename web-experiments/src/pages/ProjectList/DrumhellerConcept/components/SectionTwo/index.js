import React, { PureComponent } from 'react';
import { InView } from 'react-intersection-observer';

import MainBanner from '../MainBanner';

import ImageOneOne from '../Images/section-1-1.jpg';
import VideoOneTwo from '../Images/section-1-2.mp4';
import ImageOneThree from '../Images/section-1-3.jpg';

import './style.scss';

class SectionTwo extends PureComponent {
  componentDidUpdate() {
    if (this.props.timeline) {
      this.props.timeline.to(this.sectiononepartonetop, { x: -this.props.scrollDistance * 0.05, duration: 82 }, 18);
      this.props.timeline.to(this.sectiononepartonetbottom, { x: -this.props.scrollDistance * 0.05, duration: 82 }, 15);
    }
  }

  render() {
    return (
      <div className="drumheller-section two">
        <div className="drumheller-section-two">
          <MainBanner  
            id='01'
            title='Our Vision'
            description='We inspire a lifelong passion for science and foster a better understanding of the past, nurturing stewardship of our changing planet.'
            imageHint='A ceratopsid skeleton'
            image={ImageOneOne}
            imageAlt='Ceratopsid!'
            animateInDiv={this.props.animateInDiv}
          />
          <div className="top-video-section">
            <div className="upper-video" ref={(e) => { this.sectiononepartonetop = e; }}>
              <video autoPlay="autoplay" muted={true} loop={true}>
                <source src={VideoOneTwo} type="video/mp4" />
              </video>
            </div>
            <InView as="div" className="lower-text" ref={(e) => { this.sectiononepartonebottom = e; }} delay={100} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
              The Tyrrell is Canada’s only<br />museum dedicated exclusively<br />to the science of palaeontology.
            </InView>
          </div>
          <div className="bottom-image-section">
            <div className="upper-text">
              <InView as="div" className="panel-left" delay={100} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
                “Part of what’s special about the museum is it’s situated<br />
                in the Badlands, so the surrounding landscape is very<br />
                rich in Cretaceous Period fossils and a lot of the<br />
                material that’s found in the museum is Alberta fossil material.
              </InView>
              <InView as="div" className="panel-right" delay={100} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
                I think what’s special about coming here is the<br />
                landscape, and knowing that what you’re looking<br />
                at in the museum is so rooted in place and time and<br />
                connected, and our scientists are doing research.”
              </InView>
            </div>
            <div className="bottom-image">
              <img src={ImageOneThree} alt="Run!" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SectionTwo;
