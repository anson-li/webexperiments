import React, { PureComponent } from 'react';
import { gsap, Power4 } from 'gsap';
import { InView } from 'react-intersection-observer';

import MainBanner from '../MainBanner';
import ImageTwoOne from '../Images/section-2-1.jpg';
import ImageTwoTwo from '../Images/section-2-2.jpg';
import ImageTwoThree from '../Images/section-2-3.jpg';

import './style.scss';

class SectionThree extends PureComponent {
  componentDidUpdate() {
    if (this.props.timeline) {
      this.props.timeline.to(this.topone, { x: -this.props.scrollDistance * 0.05, duration: 25 }, 50);
      this.props.timeline.to(this.bottomone, { x: -this.props.scrollDistance * 0.03, duration: 25 }, 50);
      this.props.timeline.to(this.toptwo, { x: -this.props.scrollDistance * 0.05, duration: 25 }, 50);
      this.props.timeline.to(this.bottomtwo, { x: -this.props.scrollDistance * 0.03, duration: 25 }, 50);
    }
  }

  render() {
    return (
      <div className="drumheller-section three">
        <div className="drumheller-section-three">
          <MainBanner  
            id='02'
            title='Our Past'
            description='Established in 1985, we celebrate the 3.9 billion year history of life on Earth.'
            imageHint='A Gorgosaurus fossil'
            image={ImageTwoOne}
            imageAlt='Gorgosaurus!'
            animateInDiv={this.props.animateInDiv}
          />
          <div className="bottom-image-title">
            <InView as="div" className="upper-text" ref={(e) => { this.topone = e; }} delay={100} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
              In 1884, Joseph B. Tyrrell stumbled<br />upon a 70-million-year-old<br />dinosaur skull.
            </InView>
            <div className="bottom-image" ref={(e) => { this.bottomone = e; }}>
              <img src={ImageTwoTwo} alt="Fossils!" />
            </div>
          </div>
          <div className="top-image-description">
            <div className="top-image" ref={(e) => { this.toptwo = e; }}>
              <img src={ImageTwoThree} alt="Gorgosaurus!" />
            </div>
            <div className="lower-text" ref={(e) => { this.bottomtwo = e; }}>
              <InView as="div" className="paragraph-spacing" delay={100} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
                The young geologist stumbled upon the treasure deep in the heart of Alberta’s Badlands.<br />
                The carnivorous dinosaur, the first of its species ever found, was later named Albertosaurus Sarcophagus.
              </InView>
              <InView as="div" className="paragraph-spacing" delay={500} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
                The excavations continued after Tyrrell’s find – in 1910 American palaeontologist, Barnum Brown,<br />
                from the American Museum of Natural History in New York City, visited the area and over a period<br />
                of five years removed 16 dinosaur specimens, some that were new discoveries.
              </InView>
              <InView as="div" delay={1000} triggerOnce onChange={(inView, entry) => this.props.animateInDiv(inView, entry)}>
                When the Museum opened in 1985 it was called the Tyrrell Museum of Palaeontology,<br />
                commemorating Joseph Burr Tyrrell. In 1990, the Museum was granted the "Royal" appellation by<br />
                Her Majesty Queen Elizabeth II. While the Museum is now officially the Royal Tyrrell Museum<br />
                of Palaeontology, it's most often referred to as the Royal Tyrrell Museum.
              </InView>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SectionThree;
