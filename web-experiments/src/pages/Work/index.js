import anime from 'animejs';
import {
  TweenLite, gsap,
} from 'gsap';
import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger';
import {
  SplitText,
} from 'gsap/SplitText';
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

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText, Draggable, InertiaPlugin);

class Work extends PureComponent {
  constructor (props) {
    super(props);

    this.showDescription = this.showDescription.bind(this);
    this.handleEnterWorkContent = this.handleEnterWorkContent.bind(this);
    this.handleLeaveWorkContent = this.handleLeaveWorkContent.bind(this);
    this.handleMoveWorkContent = this.handleMoveWorkContent.bind(this);

    this.prevRef = null;
    this.childSplit = null;
    this.interactionsReady = false;
    this.workHovered = false;
    this.firstHover = false;

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
        title: 'Polaroid Wall',
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
        title: 'WebGL Shader Library',
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
    this.interactionsReady = false;

    // Tweening seed to high levels to create 'noise' effect
    TweenLite.to('#workTurbulence', 8, {
      attr: {
        seed: 10000,
      },
      repeat: -1,
      yoyo: true,
    });

    this.childSplit = new SplitText(this.description, {
      linesClass: 'inview-split-child',
      type: 'lines',
    });
    // eslint-disable-next-line no-new
    new SplitText(this.description, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
    gsap.from(this.childSplit.lines, {
      delay: 1,
      duration: 1.5,
      ease: 'power4',
      stagger: 0.1,
      yPercent: 100,
    });

    this.projects.forEach((project) => {
      project.ref.current.handleFadeIn();
    });

    setTimeout(() => {
      this.handleCompleteLoadingAnimations();
    }, 1000);
  }

  handleCompleteLoadingAnimations () {
    this.interactionsReady = true;
    this.projects.forEach((project) => {
      project.ref.current.handleCompleteLoadingAnimations();
    });
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

  showDescription (description) {
    TweenLite.to(this.description, 0, {
      text: description,
    });
  }

  handleMoveWorkContent () {
    // Used for when hovered over the page before all animations are done
    if (this.workHovered && !this.firstHover) {
      this.handleEnterWorkContent();
      this.firstHover = true;
    }
  }

  handleEnterWorkContent () {
    if (this.interactionsReady) {
      TweenLite.to(this.el, 0.5, {
        backgroundColor: '#111111',
      });
      TweenLite.to(this.description, 0.5, {
        color: 'white',
      });
      this.projects.forEach((project) => {
        project.ref.current.handleEnterWorkContent();
      });
    } else {
      this.workHovered = true;
    }
  }

  handleLeaveWorkContent (event) {
    // Remove random bubbling by Section component
    if (event.target === this.workcontent && this.interactionsReady) {
      TweenLite.to(this.el, 0.5, {
        backgroundColor: '#EDECED',
      });
      TweenLite.to(this.description, 0.5, {
        color: 'black',
      });
      TweenLite.to(this.description, 0, {
        text: 'ANSON LI WEB EXPERIMENTS THREEJS GREENSOCK CURTAINSJS BLENDER VIDEOEDITING SVG',
      });
      this.projects.forEach((project) => {
        project.ref.current.handleLeaveWorkContent();
      });
    } else {
      this.workHovered = false;
    }
  }

  render () {
    const {cursorHover, cursorUnhover} = this.props;

    const renderText = this.projects.map((project) => {
      return <Section
        delay={this.projects.length - project.id}
        description={project.description}
        hover={cursorHover}
        id={project.id}
        imageref={project.ref}
        key={project.id}
        link={project.link}
        ref={project.ref}
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
        <div className={styles.background}>
          <svg
            height='100%'
            width='100%'
          >
            <filter id='workFilter' x='0' y='0'>
              <feTurbulence
                baseFrequency='0.6'
                id='workTurbulence'
                seed='0'
                type='turbulence' />
              <feColorMatrix type='matrix' values='.33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0' />
            </filter>

            <rect fill='#fff' height='100%' opacity='0.00' width='100%' />
            <rect filter='url(#workFilter)' height='100%' opacity='0.50' width='100%' />
          </svg>
        </div>
        <div id={styles['animation-wrapper']}>
          <TextLogo
            hover={cursorHover}
            unhover={cursorUnhover}
          />
          <div className={styles['work-image']}>
            <div
              className={styles['work-description']} ref={(element) => {
                this.description = element;
              }}>
              ANSON LI WEB EXPERIMENTS THREEJS GREENSOCK CURTAINSJS BLENDER VIDEOEDITING SVG
            </div>
          </div>
          <div
            className={styles['work-content']}
            onMouseEnter={this.handleEnterWorkContent}
            onMouseLeave={this.handleLeaveWorkContent}
            onMouseMove={this.handleMoveWorkContent}
            ref={(element) => {
              this.workcontent = element;
            }}
          >
            {renderText}
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
