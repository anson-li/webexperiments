import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import styles from './style.module.scss';

class Card extends PureComponent {
  render () {
    const {description, image, left, top} = this.props;

    return (
      <div
        className={styles.box}
        ref={this.props.innerRef}
        style={{
          left,
          top,
        }}>
        <img alt='Card alternate' src={image} />
        <br />
        {description}
      </div>
    );
  }
}

Card.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  innerRef: PropTypes.func.isRequired,
  left: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
};

export default React.forwardRef((props, ref) => {
  return <Card
    innerRef={ref} {...props}
  />;
});
