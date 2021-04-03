import React, { PureComponent } from 'react';
import { InView } from 'react-intersection-observer';

import styles from './style.module.scss';

class MainBanner extends PureComponent {
  render() {
    const { id, title, description, imageHint, image, animateInDiv, imageAlt, validateImagesLoaded } = this.props;
    return (
      <>
        <div className={styles["main-banner"]}>
          <div className={styles["banner-index"]}>{id}</div>
          <InView as="div" delay={100} triggerOnce className={styles["banner-title"]} onChange={(inView, entry) => animateInDiv(inView, entry)}>
            {title}
          </InView>
          <InView as="div" delay={1000} triggerOnce className={styles["banner-description"]} onChange={(inView, entry) => animateInDiv(inView, entry)}>
            {description}
          </InView>
          <InView as="div" delay={1000} triggerOnce className={styles["banner-right-hint"]} onChange={(inView, entry) => animateInDiv(inView, entry)}>
            <div className={styles["banner-right-hint-title"]}>RIGHT</div>
            <div className={styles["banner-right-hint-description"]}>{imageHint}</div>
          </InView>
        </div>
        <div className={styles["fullscreen-image"]}>
          <img src={image} onLoad={validateImagesLoaded()} alt={imageAlt} />
        </div>
      </>
    );
  }
}


export default MainBanner;
