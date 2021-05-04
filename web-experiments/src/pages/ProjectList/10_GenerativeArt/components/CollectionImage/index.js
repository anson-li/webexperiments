import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import DitheredImage from '../DitheredImage';
import styles from './style.module.scss';

class CollectionImage extends PureComponent {
  render () {
    return (
      <div className={styles['image-content']}>
        <div className={styles.image}>
          <DitheredImage
            image={this.props.image}
          />
        </div>
        <div className={styles.description}>
          <div className={styles.date}>
            {this.props.date}
          </div>
          <div className={styles.descriptionText}>
            {this.props.description}
          </div>
        </div>
      </div>
    );
  }
}

CollectionImage.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CollectionImage;
