import {
  gsap, Power4,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import React, {
  PureComponent,
} from 'react';
import GalleryImage from './components/GalleryImage';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class MultipleImageGallery extends PureComponent {
  componentDidMount () {
    gsap.from(this.animatedinnerimage1, 0.7, {
      delay: 1.8,
      ease: Power4,
      filter: 'grayscale(100%)',
      opacity: 0,
      y: 100,
    });

    gsap.from(this.animatedinnerimage2, 0.7, {
      delay: 1.9,
      ease: Power4,
      filter: 'grayscale(100%)',
      opacity: 0,
      y: 100,
    });

    gsap.from(this.animatedinnerimage3, 0.7, {
      delay: 2,
      ease: Power4,
      filter: 'grayscale(100%)',
      opacity: 0,
      y: 100,
    });
  }

  render () {
    return (
      <>
        <div className={styles['image-gallery']}>
          <div className={styles['image-gallery-row']}>
            <GalleryImage
              date='June 2019'
              delay={1.8}
              description='An experimental web suite.'
              image='https://unsplash.it/400/400?random=2'
              title='Web Experiments'
            />
            <GalleryImage
              date='December 2019'
              delay={1.9}
              description='A paint-based experiment.'
              image='https://unsplash.it/400/400?random=3'
              title='Alternative Arts'
            />
            <GalleryImage
              date='May 2020'
              delay={2.0}
              description='A short feature film.'
              image='https://unsplash.it/400/400?random=4'
              title='Defending Dark'
            />
          </div>
          <div className={styles['image-gallery-row']}>
            <GalleryImage
              date='June 2019'
              delay={1.8}
              description='An experimental web suite.'
              image='https://unsplash.it/400/400?random=5'
              title='Web Experiments'
            />
            <GalleryImage
              date='December 2019'
              delay={1.9}
              description='A paint-based experiment.'
              image='https://unsplash.it/400/400?random=6'
              title='Alternative Arts'
            />
            <GalleryImage
              date='May 2020'
              delay={2.0}
              description='A short feature film.'
              image='https://unsplash.it/400/400?random=7'
              title='Defending Dark'
            />
          </div>
          <div className={styles['image-gallery-row']}>
            <GalleryImage
              date='June 2019'
              delay={1.8}
              description='An experimental web suite.'
              image='https://unsplash.it/400/400?random=8'
              title='Web Experiments'
            />
            <GalleryImage
              date='December 2019'
              delay={1.9}
              description='A paint-based experiment.'
              image='https://unsplash.it/400/400?random=9'
              title='Alternative Arts'
            />
            <GalleryImage
              date='May 2020'
              delay={2.0}
              description='A short feature film.'
              image='https://unsplash.it/400/400?random=10'
              title='Defending Dark'
            />
          </div>
        </div>
      </>
    );
  }
}

export default MultipleImageGallery;

