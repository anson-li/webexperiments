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
      .timeline({loop})
      .add({
        delay: (element, interval) => {
          return base + iteration * interval;
        },
        duration: 2250,
        easing: 'easeOutExpo',
        opacity: [0, 1],
        targets,
      });
  }

  render () {
    const {className, id, text} = this.props;

    return (
      <this.props.type
        className={`${className} ml3`}
        id={id}
      >
        {
          text.split('').map((letter, index) => {
            return (
              <span className='letter' key={letter.concat(index)}>{letter}</span>
            );
          })
        }
      </this.props.type>
    );
  }
}

FadeText.propTypes = {
  base: PropTypes.number,
  className: PropTypes.string,
  id: PropTypes.string,
  iteration: PropTypes.number,
  loop: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

FadeText.defaultProps = {
  base: 500,
  className: '',
  id: '',
  iteration: 30,
  loop: false,
};

export default FadeText;
