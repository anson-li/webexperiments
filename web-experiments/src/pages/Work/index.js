import anime from 'animejs';
import {
  TweenLite, gsap,
} from 'gsap';
import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger';
import {
  TextPlugin,
} from 'gsap/TextPlugin';
import {
  Draggable, InertiaPlugin,
} from 'gsap/all';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../common/TextLogo';
import WithTransition from '../../common/WithTransition';
import Section from './components/Section';
import styles from './style.module.scss';

gsap.registerPlugin(ScrollTrigger, TextPlugin, Draggable, InertiaPlugin);

class Work extends PureComponent {
  constructor (props) {
    super(props);

    this.showDescription = this.showDescription.bind(this);
    this.handleEnterWorkContent = this.handleEnterWorkContent.bind(this);
    this.handleLeaveWorkContent = this.handleLeaveWorkContent.bind(this);

    this.prevRef = null;

    this.moodboard = React.createRef();
    this.webglgallery = React.createRef();
    this.webglcurtains = React.createRef();
    this.drumhellerconcept = React.createRef();
    this.dinosaurloader = React.createRef();
    this.colorshader = React.createRef();
    this.asciishader = React.createRef();
    this.coffeecup = React.createRef();
    this.jellicent = React.createRef();

    this.projects = [
      {
        description: 'Interactive mood board, with draggable elements built with GSAP and new page structure',
        id: 9,
        link: '/moodboard',
        ref: this.moodboard,
        title: 'Moodboard',
      },
      {
        description: 'Horizontal gallery designed for image-first navigation, built in WebGL & GSAP.',
        id: 8,
        link: '/webglgallery',
        ref: this.webglgallery,
        title: 'WebGL Gallery',
      },
      {
        description: 'Collection of various shaders and WebGL examples for reference from book of shaders',
        id: 7,
        link: '/webglcurtains',
        ref: this.webglcurtains,
        title: 'WEBGL Shader Library',
      },
      {
        description: 'Proof of concept for Drumheller\'s main page advanced GSAP techniques & video manipulation.',
        id: 6,
        link: '/drumheller',
        ref: this.drumhellerconcept,
        title: 'Drumheller Concept',
      },
      {
        description: 'Fill loader template built via SVG and GSAP built with offset svg exclusive trans-formations',
        id: 5,
        link: '/dinosaurloader',
        ref: this.dinosaurloader,
        title: 'SVG Loader',
      },
      {
        description: 'Additive shader designed to wash out the color & interactive color shifting with dat.gui',
        id: 4,
        link: '/additiveshader',
        ref: this.colorshader,
        title: 'Color Shader',
      },
      {
        description: 'Bitmap shader for threejs to render scene through custom 2d pixel art filter',
        id: 3,
        link: '/asciishader',
        ref: this.asciishader,
        title: 'ASCII Shader',
      },
      {
        description: 'threejs blender tutorial guru hand-made models imported gltf and animated',
        id: 2,
        link: '/coffeecup',
        ref: this.coffeecup,
        title: 'Coffee Cup',
      },
      {
        description: 'threejs experimentation imported model camera post-processing mouse interactions',
        id: 1,
        link: '/jellicent',
        ref: this.jellicent,
        title: 'Jellicent',
      },
    ];
  }

  componentDidMount () {
    this.props.hideLoader();
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
    const {showLoader} = this.props;
    showLoader();

    return anime({
      duration: 1000,
      easing: 'easeOutExpo',
      opacity: 0,
      targets: this.el,
    }).finished;
  }

  showDescription (description, background, ref) {
    TweenLite.to(this.description, 0, {
      text: description,
    });
  }

  handleEnterWorkContent () {
    TweenLite.to(this.el, 0.5, {
      backgroundColor: '#111111',
    });
    TweenLite.to(this.description, 0.5, {
      color: 'white',
    });
  }

  handleLeaveWorkContent () {
    TweenLite.to(this.el, 0.5, {
      backgroundColor: '#EDECED',
    });
    TweenLite.to(this.description, 0.5, {
      color: 'black',
    });
    TweenLite.to(this.description, 0, {
      text: 'ANSON LI WEB EXPERIMENTS THREEJS GREENSOCK CURTAINSJS BLENDER VIDEOEDITING SVG',
    });
  }

  render () {
    const {cursorHover, cursorUnhover} = this.props;

    const renderImages = this.projects.map((project) => {
      return <img
        alt='Project background'
        className={styles['box-image-background']}
        key={project.id}
        ref={project.ref}
        src={project.image}
      />;
    });

    const renderText = this.projects.map((project) => {
      return <Section
        description={project.description}
        hover={cursorHover}
        id={project.id}
        imageref={project.ref}
        key={project.id}
        link={project.link}
        showDescription={this.showDescription}
        title={project.title}
        unhover={cursorUnhover}
      />;
    });

    return (
      <div
        id={styles['work-page']} ref={(element) => {
          this.el = element;
        }}>
        <div id={styles['animation-wrapper']}>
          <TextLogo
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          <div className={styles['work-image']}>
            {renderImages}
            <div
              className={styles['work-description']} ref={(e) => {
                this.description = e;
              }}>
              ANSON LI WEB EXPERIMENTS THREEJS GREENSOCK CURTAINSJS BLENDER VIDEOEDITING SVG
            </div>
          </div>
          <div
            className={styles['work-content']}
            onMouseEnter={this.handleEnterWorkContent}
            onMouseLeave={this.handleLeaveWorkContent}
          >
            <div
              className={styles.track} id={styles.track} ref={(element) => {
                this.track = element;
              }}>
              {renderText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Work.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

export default WithTransition(Work);
