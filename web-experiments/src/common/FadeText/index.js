import anime from 'animejs';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';

class FadeText extends PureComponent {
  componentDidMount () {
    const {
      id, loop, base, iteration,
    } = this.props;
    const targets = `#${id}.ml3 .letter`;
    anime
      .timeline({ loop })
      .add({
        targets,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 2250,
        delay: (el, i) => {
          return base + iteration * i;
        },
      });
  }

  render () {
    const { className, id, text } = this.props;

    return (
      <this.props.type
        className={`${className} ml3`}
        id={id}
      >
        {
          text.split('').map((v, index) => {
            return (
              <span className='letter' key={v.concat(index)}>{v}</span>
            );
          })
        }
      </this.props.type>
    );
  }
}

FadeText.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string.isRequired,
  base: PropTypes.number,
  iteration: PropTypes.number,
  loop: PropTypes.bool,
};

FadeText.defaultProps = {
  className: '',
  id: '',
  base: 500,
  iteration: 30,
  loop: false,
};

export default FadeText;
