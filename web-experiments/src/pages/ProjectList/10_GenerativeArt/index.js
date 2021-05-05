import {
  library,
} from '@fortawesome/fontawesome-svg-core';
import {
  fab,
} from '@fortawesome/free-brands-svg-icons';
import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';
import anime from 'animejs';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import CollectionImage from './components/CollectionImage';
import styles from './style.module.scss';

library.add(fab);

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
          <div className={styles['icon-set']}>
            <a href='https://github.com/anson-li'><FontAwesomeIcon icon={['fab', 'github']} size='lg' /></a>
            <a href='https://www.linkedin.com/in/anson-ii/'><FontAwesomeIcon icon={['fab', 'linkedin']} size='lg' /></a>
            <a href='https://dribbble.com/anson-li'><FontAwesomeIcon icon={['fab', 'dribbble']} size='lg' /></a>
          </div>
          <div className={styles.cross}>
            <span className={styles['cross-height']} />
            <span className={styles['cross-width']} />
          </div>
          <div
            className={styles['lead-text']}>
            Collection continued below →
          </div>
          <div className={styles['left-content']}>
            <div
              className={styles['title-text']}
              ref={(element) => {
                this.title = element;
              }}
            >
              Hide &amp; <i>R</i>eveal
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
            <CollectionImage
              date='March 2021'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lobortis lectus, ac luctus magna blandit vel.'
              image='https://unsplash.it/1920/1080?random=1'
            />
            <CollectionImage
              date='March 2021'
              description='Nulla at arcu mauris. Suspendisse sed blandit est. Aliquam eget orci sed massa mollis imperdiet nec sed diam.'
              image='https://unsplash.it/1920/1080?random=2'
            />
            <CollectionImage
              date='March 2021'
              description='Sed nec turpis quis dui maximus pretium non vel turpis. Proin vel pretium tellus, a eleifend ipsum eu nisl vitae.'
              image='https://unsplash.it/1920/1080?random=3'
            />
            <CollectionImage
              date='March 2021'
              description='Sed gravida dapibus nisi id mattis. Maecenas massa velit, tincidunt non dolor vitae, hendrerit elementum mi.'
              image='https://unsplash.it/1920/1080?random=4'
            />
            <CollectionImage
              date='March 2021'
              description='Suspendisse condimentum sollicitudin mauris venenatis dapibus. Proin lacinia risus sed libero egestas, at scelerisque urna viverra.'
              image='https://unsplash.it/1920/1080?random=5'
            />
            <CollectionImage
              date='March 2021'
              description='Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In posuere aliquam magna nec lacinia.'
              image='https://unsplash.it/1920/1080?random=6'
            />
            <CollectionImage
              date='March 2021'
              description='Aenean placerat dui lectus, eget consectetur eros commodo sed. Aliquam congue nisi a porttitor convallis.'
              image='https://unsplash.it/1920/1080?random=7'
            />
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
