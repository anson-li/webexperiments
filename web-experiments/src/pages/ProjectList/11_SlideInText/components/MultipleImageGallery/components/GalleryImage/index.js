import {
  gsap, Power4,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class GalleryImage extends PureComponent {
  constructor (props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount () {
    const {delay} = this.props;
    gsap.set(this.animatedinnerimage, {
      backgroundPosition: 'center',
      backgroundSize: '100% 100%',
      filter: 'grayscale(100%)',
    });
    gsap.from(this.animatedinnerimage, 0.7, {
      delay,
      ease: Power4,
      opacity: 0,
      y: 100,
    });
    gsap.from(this.imagedescription, 0.7, {
      delay,
      ease: Power4,
      opacity: 0,
      y: 100,
    });
  }

  handleMouseEnter () {
    gsap.to(this.animatedinnerimage, 0.5, {
      backgroundSize: '110% 110%',
      filter: 'none',
    });
  }

  handleMouseLeave () {
    gsap.to(this.animatedinnerimage, 0.5, {
      backgroundSize: '100% 100%',
      filter: 'grayscale(100%)',
    });
  }

  render () {
    const {image, description, date, title} = this.props;

    return (
      <>
        <div
          className={styles['animated-image']}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          ref={(element) => {
            this.animatedimage = element;
          }}>
          <div
            className={styles['animated-inner-image']}
            ref={(element) => {
              this.animatedinnerimage = element;
            }}
            style={{backgroundImage: `url(${image})`}} />
          <div
            className={styles['animated-image-description']}
            ref={(element) => {
              this.imagedescription = element;
            }}>
            <div className={styles['animated-image-description-title']}>
              {title}
            </div>
            <div className={styles['animated-image-description-description']}>
              {description}
            </div>
            <div className={styles['animated-image-description-date']}>
              {date}
            </div>
          </div>
        </div>
      </>
    );
  }
}

GalleryImage.propTypes = {
  date: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default GalleryImage;

