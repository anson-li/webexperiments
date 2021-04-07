import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  InView,
} from 'react-intersection-observer';
import styles from './style.module.scss';

class MainBanner extends PureComponent {
  render () {
    const {id, title, description, imageHint, image, animateInDiv, imageAlt, validateImagesLoaded} = this.props;

    return (
      <>
        <div className={styles['main-banner']}>
          <div className={styles['banner-index']}>{id}</div>
          <InView
            as='div' className={styles['banner-title']} delay={100}
            onChange={(inView, entry) => {
              return animateInDiv(inView, entry);
            }} triggerOnce>
            {title}
          </InView>
          <InView
            as='div' className={styles['banner-description']} delay={1000}
            onChange={(inView, entry) => {
              return animateInDiv(inView, entry);
            }} triggerOnce>
            {description}
          </InView>
          <InView
            as='div' className={styles['banner-right-hint']} delay={1000}
            onChange={(inView, entry) => {
              return animateInDiv(inView, entry);
            }} triggerOnce>
            <div className={styles['banner-right-hint-title']}>RIGHT</div>
            <div className={styles['banner-right-hint-description']}>{imageHint}</div>
          </InView>
        </div>
        <div className={styles['fullscreen-image']}>
          <img alt={imageAlt} onLoad={validateImagesLoaded()} src={image} />
        </div>
      </>
    );
  }
}

MainBanner.propTypes = {
  animateInDiv: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imageHint: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  validateImagesLoaded: PropTypes.func.isRequired,
};

export default MainBanner;
