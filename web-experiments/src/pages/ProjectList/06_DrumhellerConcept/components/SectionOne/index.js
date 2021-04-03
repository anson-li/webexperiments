import React, { PureComponent } from 'react';
import { gsap, Power4 } from 'gsap';

import ImageIntroOne from '../Images/intro-1.jpg';
import ImageIntroTwo from '../Images/intro-2.jpg';
import Underline from '../Images/underline.png';

import './style.scss';

class SectionOne extends PureComponent {
  constructor(props) {
    super(props);
    this.drawUnderline = this.drawUnderline.bind(this);
    this.tl = null;
  }

  componentDidUpdate() {
    if (this.props.timeline) {
      this.props.timeline.to(this.imageone, { x: -this.props.scrollDistance * 0.12, duration: 100 }, 0);
      this.props.timeline.to(this.imagetwo, { x: -this.props.scrollDistance * 0.1, duration: 100 }, 0);
      this.props.timeline.to(this.titleitalic, { x: -this.props.scrollDistance * 0.15, duration: 100 }, 0);
    }
  }

  drawUnderline() {
    if (!this.tl || !this.tl.isActive()) {
      this.tl = gsap.timeline()
        .from(this.underline, 1.5, {
          clipPath: 'inset(0% 100% 0% 0%)',
          ease: Power4,
          delay: 1,
        });
      this.tl.play();
    }
  }

  render() {
    const { validateImagesLoaded } = this.props;
    return (
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
                <span className="custom-underline" ref={(e) => { this.underline = e; }}>
                  <img src={Underline} alt="Underline" />
                </span>
              </span>
            </div>
          </div>
          <div className="description">
          Set in the rugged Alberta badlands, the Royal Tyrrell<br/>
          Museum of Palaeontology displays one of the world's<br/>
          largest collections of dinosaurs.<br/><br/>

          With ever-changing exhibits and self-guided experiences<br/>
          year-round, there is always something new to discover.
          </div>
        </div>
        <div ref={(e) => { this.imagetwo = e; }} className="image-block drumheller-imageblock-two">
          <img src={ImageIntroTwo} onLoad={validateImagesLoaded()} alt="Skeleton!" />
          <div className="image-block-description">Tyrannosaurus Rex Skeleton</div>
        </div>
        <div ref={(e) => { this.imageone = e; }} className="image-block drumheller-imageblock-one">
          <img src={ImageIntroOne} onLoad={validateImagesLoaded()} alt="Dinosaurs!" />
          <div className="image-block-description">Dinosaurs Recreated for Today</div>
        </div>
      </div>
    );
  }
}


export default SectionOne;
