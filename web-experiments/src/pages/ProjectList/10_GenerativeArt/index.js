import anime from 'animejs';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import DitheredImage from './components/DitheredImage';
import styles from './style.module.scss';

class GenerativeArt extends PureComponent {
  componentDidMount () {
    this.props.hideLoader();
    this.props.hideFollow();
  }

  hidePage () {
    anime.remove(this.el);

    return anime({
      duration: 0,
      opacity: 0,
      targets: this.el,
    }).finished;
  }

  animateIn () {
    anime.remove(this.el);

    return anime({
      delay: 1000,
      duration: 1000,
      easing: 'easeOutExpo',
      opacity: [0, 1],
      targets: this.el,
    }).finished;
  }

  animateOut () {
    anime.remove(this.el);
    this.props.showFollow();
    const {showLoader} = this.props;
    showLoader();

    return anime({
      duration: 1000,
      easing: 'easeOutExpo',
      opacity: 0,
      targets: this.el,
    }).finished;
  }

  render () {
    const {cursorHover, cursorUnhover} = this.props;

    return (
      <div
        className={styles['generative-background']}
        id='generative-art'
        ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <div
          className={styles['page-content']}
        >
          <div className={styles.cross}>
            <span className={styles['cross-height']} />
            <span className={styles['cross-width']} />
          </div>
          <div className={styles['left-content']}>
            <div
              className={styles['title-text']}
              ref={(element) => {
                this.title = element;
              }}
            >
              Purple <i>E</i>lephants
            </div>
            <div
              className={styles['description-text']}
            >
              <div className={styles['left-description']}>
                Design
              </div>
              <div className={styles['right-description']}>
                Collection of generative art from around the globe, curated into one collection.
              </div>
            </div>
          </div>
          <div className={styles['right-content']}>
            <div className={styles['image-content']}>
              <div className={styles.image}>
                <DitheredImage
                  image='https://unsplash.it/1920/1080?random=1'
                />
              </div>
              <div className={styles.description}>
                A handmade generative isodecahedron.
              </div>
            </div>
            <div className={styles['image-content']}>
              <div className={styles.image}>
                <DitheredImage
                  image='https://unsplash.it/1920/1080?random=2'
                />
              </div>
              <div className={styles.description}>
                A handmade generative isodecahedron.
              </div>
            </div>
            <div className={styles['image-content']}>
              <div className={styles.image}>
                <DitheredImage
                  image='https://unsplash.it/1920/1080?random=3'
                />
              </div>
              <div className={styles.description}>
                A handmade generative isodecahedron.
              </div>
            </div>
            <div className={styles['image-content']}>
              <div className={styles.image}>
                <DitheredImage
                  image='https://unsplash.it/1920/1080?random=4'
                />
              </div>
              <div className={styles.description}>
                A handmade generative isodecahedron.
              </div>
            </div>
            <div className={styles['image-content']}>
              <div className={styles.image}>
                <DitheredImage
                  image='https://unsplash.it/1920/1080?random=5'
                />
              </div>
              <div className={styles.description}>
                A handmade generative isodecahedron.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GenerativeArt.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideFollow: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showFollow: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

export default WithTransition(GenerativeArt);
