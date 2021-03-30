import React, { PureComponent } from 'react';
import { InView } from 'react-intersection-observer';

import MainBanner from '../MainBanner';

import ImageThreeOne from '../Images/section-3-1.jpg';
import ImageThreeTwo from '../Images/section-3-2.jpg';
import ImageThreeThree from '../Images/section-3-3.jpg';

import './style.scss';

class SectionFour extends PureComponent {
  componentDidUpdate() {
    if (this.props.timeline) {
      this.props.timeline.to(this.topone, { x: -this.props.scrollDistance * 0.03, duration: 30 }, 70);
      this.props.timeline.to(this.bottomone, { x: -this.props.scrollDistance * 0.02, duration: 30 }, 70);
      this.props.timeline.to(this.toptwo, { x: -this.props.scrollDistance * 0.03, duration: 30 }, 70);
      this.props.timeline.to(this.bottomtwo, { x: -this.props.scrollDistance * 0.02, duration: 30 }, 70);
    }
  }

  render() {
    return (
      <div className="drumheller-section four">
        <div className="drumheller-section-four">
          <MainBanner  
            id='03'
            title='Our Future'
            description='We foster an environment of learning and development for future generations.'
            imageHint='Inspiring creativity'
            image={ImageThreeOne}
            imageAlt='Dinosaur!'
            animateInDiv={this.props.animateInDiv}
          />
          <div className="top-image-title">
            <div className="top-image" ref={(e) => { this.topone = e; }}>
              <img src={ImageThreeTwo} alt="Dinosaur?" />
            </div>
            <InView as="div" className="lower-text" delay={100} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
              New discoveries are made everyday, thanks to the great work at Tyrrell.
            </InView>
          </div>
          <div className="bottom-image-section">
            <div className="upper-text" ref={(e) => { this.toptwo = e; }}>
              <InView as="div" className="panel-left" delay={100} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
                Every year, new discoveries are made at the<br />
                Royal Tyrrell Museum that change the landscape of<br />
                the world of Palaeontology. Most recently, researchers<br />
                have discovered a brand new Tyrannosaurus species;<br />
                the first in 50 years.
              </InView>
              <InView as="div" className="panel-right" delay={100} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
                Additionally, the Royal Tyrrell offers an interactive<br />
                space, where people take part in interactive displays<br />
                to learn about how the dinosaur ate, moved and<br />
                interacted with other organisms in its environment.
              </InView>
            </div>
            <div className="bottom-image" ref={(e) => { this.bottomtwo = e; }}>
              <img src={ImageThreeThree} alt="Dinosaur!" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SectionFour;
