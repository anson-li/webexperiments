import anime from 'animejs';
import {
  TweenLite,
} from 'gsap';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import ThreeJS from './components/ThreeJS';
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
    const {hideLoader, cursorHover, cursorUnhover} = this.props;

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
          <ThreeJS
            height={500}
            hideLoader={hideLoader}
            width={500}
          />
          <div
            className={styles['title-text']}
            ref={(element) => {
              this.title = element;
            }}
          >
            Generative <i>A</i>rt
          </div>
          <div className={styles.body}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper sit amet lacus ac tincidunt. Duis a
            c viverra orci. Fusce rutrum lacus dolor. Aenean sed mi porta orci accumsan viverra. Nulla ultrices tellus vitae pla
            cerat facilisis. Aenean commodo suscipit dolor, quis lobortis odio iaculis in. Cras sit amet mi neque. Ut ac aliquam sapien.
            <br /><br />
            Nullam blandit lacinia purus, ac efficitur lorem commodo eget. Mauris posuere pellentesque tellus vitae porttitor. Pr
            oin ac euismod lorem. Donec nunc quam, vulputate nec ullamcorper et, ullamcorper quis lorem. Aliquam porta, massa eu veh
            icula mattis, nisi ipsum sodales tortor, id congue felis urna auctor lectus. Mauris felis libero, ultricies vitae ma
            ssa sit amet, tempus blandit quam. Donec a mauris sapien. Curabitur nunc diam, molestie eu ultricies in, auctor nec ni
            bh. Duis consectetur blandit rutrum. Sed ac magna ipsum. Praesent enim lectus, porta non suscipit eleifend, mattis eget ne
            que. Nullam convallis venenatis tortor, non aliquet enim sollicitudin quis. In a ullamcorper odio. Vivamus a gravida odio, eu semper mauris.
            <br /><br />
            Cras vel mattis ipsum. Quisque in lorem at diam gravida tincidunt. Quisque et turpis tristique, imperdiet nunc in, posu
            ere ipsum. Aenean sed volutpat nibh. Curabitur non feugiat dolor. Vivamus sollicitudin fringilla turpis, eget bibendum nul
            la efficitur pulvinar. Aliquam erat volutpat. Fusce vel justo eget nulla rutrum posuere. Nulla eu nibh quam. Donec qu
            is ligula tincidunt mauris dapibus commodo. Cras tempus ut odio at molestie.
            <br /><br />
            Nam mattis vel metus et ornare. Sed facilisis urna nisi, nec dapibus nibh hendrerit sed. Mauris in est volutpat, commod
            o nisi quis, ultrices ligula. Phasellus urna purus, tincidunt non diam et, tempus fringilla nibh. Maecenas facilisis ligula et te
            llus dapibus ullamcorper. Donec ultrices aliquet arcu. Nunc finibus ornare nunc id porttitor. Phasellus elementum mi at magna r
            honcus, at ullamcorper tellus accumsan. Nullam sit amet enim dolor. Cras lacinia pretium purus ac euismod. Ut nec sem est. Aen
            ean luctus mattis elementum. Cras velit sapien, dapibus ut mi quis, dignissim sollicitudin sapien.
            <br /><br />
            Integer vehicula posuere velit, ac scelerisque arcu semper nec. Suspendisse sit amet imperdiet libero. Vestibulum pretium a
            ugue nisi, quis maximus nulla facilisis sed. Proin euismod, leo et aliquet egestas, turpis lorem rutrum est, non susci
            pit nisl augue id dui. Proin a augue est. Fusce facilisis finibus magna nec condimentum. Nulla turpis nulla, dictum in pul
            vinar non, mollis sed lectus. In ullamcorper convallis ex, eget ultrices augue cursus scelerisque.
            <br /><br />
            Nullam sit amet justo metus. Pellentesque dictum nisi ac orci ultricies pretium. In urna ex, tempor vehicula velit id, pelle
            ntesque venenatis arcu. Duis luctus accumsan risus ut consectetur. Duis eu arcu consectetur, mollis diam vitae, conva
            llis metus. Morbi et nisl consequat, varius turpis sed, interdum purus. Nunc porttitor vestibulum eros, eu tincidunt urna su
            scipit eu. Etiam libero augue, varius feugiat efficitur at, venenatis quis nisl. Aliquam enim lectus, ornare eget augue et, faci
            lisis fermentum purus. Nam tellus lorem, malesuada sed ipsum a, sollicitudin consectetur ante. Nunc posuere gravida ma
            gna, suscipit tincidunt augue fermentum eget.
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
