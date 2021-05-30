/* eslint-disable no-new */
import {
  gsap,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import {
  Draggable, InertiaPlugin,
} from 'gsap/all';
import PropTypes from 'prop-types';
import React, {
  createRef,
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import GridBackground from './Images/pixelgrid.png';
import Card from './components/Card';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText, Draggable, InertiaPlugin);

class InteractiveMoodBoard extends PureComponent {
  constructor (props) {
    super(props);
    this.setupDraggable = this.setupDraggable.bind(this);
    this.animateFadeIn = this.animateFadeIn.bind(this);

    this.card1 = createRef();
    this.card2 = createRef();
    this.card3 = createRef();
    this.card4 = createRef();
    this.card5 = createRef();

    this.onWindowResize = this.onWindowResize.bind(this);
    this.draggables = [];
  }

  componentDidMount () {
    this.animateFadeIn();
    this.setupDraggable();
    window.addEventListener('resize', this.onWindowResize, false);
    this.animateIn();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize () {
    this.draggables.forEach((element) => {
      element[0].update(true, false);
    });
  }

  animateFadeIn () {
    this.props.hideLoader();
    new SplitText(this.pagetitle, {
      charsClass: 'inview-split-parent',
      type: 'words,chars',
    });
    this.childSplit = new SplitText(this.pagetitle, {
      charsClass: 'inview-split-child',
      type: 'words,chars',
    });
    this.childHeaderSplit = new SplitText(this.pageheader, {
      linesClass: 'inview-split-child',
      type: 'lines',
    });
    new SplitText(this.pageheader, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
    this.childDescriptionSplit = new SplitText(this.pagedescription, {
      linesClass: 'inview-split-child',
      type: 'lines',
    });
    new SplitText(this.pagedescription, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
    gsap.set(this.childSplit.chars, {
      perspective: 400,
    });
    gsap.from(this.childSplit.chars, {
      delay: 1,
      duration: 1.5,
      ease: 'power4',
      rotationX: 170,
      stagger: 0.05,
      yPercent: 100,
    });
    gsap.set(this.childHeaderSplit.lines, {
      perspective: 400,
    });
    gsap.from(this.childHeaderSplit.lines, {
      delay: 1.5,
      duration: 1,
      ease: 'power4',
      rotationX: 170,
      stagger: 0.05,
      yPercent: 100,
    });
    gsap.set(this.childDescriptionSplit.lines, {
      perspective: 400,
    });
    gsap.from(this.childDescriptionSplit.lines, {
      delay: 1.7,
      duration: 1.5,
      ease: 'power4',
      rotationX: 170,
      stagger: 0.05,
      yPercent: 100,
    });
    gsap.from(this.dragcontainer, {
      delay: 1.5,
      duration: 2.5,
      ease: 'power4',
      opacity: 0,
      yPercent: 100,
    });
  }

  animateIn () {
    this.props.hideLoader();
  }

  animateOut () {
    this.props.showLoader();
  }

  setupDraggable () {
    const cardElements = [this.card1.current, this.card2.current, this.card3.current, this.card4.current, this.card5.current];
    cardElements.forEach((card) => {
      const element = Draggable.create(card, {
        autoScroll: true,
        bounds: this.dragcontainer,
        cursor: 'none',
        dragClickables: true,
        dragResistance: 0.5,
        inertia: true,
        onDrag: (event) => {
          this.props.moveCursor(event);
        },
        type: 'x,y',
      });
      this.draggables.push(element);
    });
  }

  render () {
    const {cursorHover, cursorUnhover, transitionStatus} = this.props;

    return (
      <div
        className={`${styles['page-background']} ${transitionStatus}`}
        id='main-page'
        ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <div
          className={styles['page-content']}
          style={{backgroundImage: `url(${GridBackground})`}}
        >
          <div
            className={styles['page-title']}
            ref={(element) => {
              this.pagetitle = element;
            }}>
            Polaroidia
          </div>
          <div
            className={styles['page-description']}
          >
            <div
              className={styles.title}
              ref={(element) => {
                this.pageheader = element;
              }}
            >
              Description
            </div>
            <div
              className={styles.description}
              ref={(element) => {
                this.pagedescription = element;
              }}
            >
              This project explores the concept of having a interactive &lsquo;mood board&rsquo;. In this experiment,
              users can view a collage of images as a set of Polaroid pictures. Users can drag through different pictures
              and place them in different patterns &amp; workflows to improve visual clarity. This system can be extended to
              include self-served images, different collage collections, albums pulled from different APIs, etc.
              <br />⠀<br />
              Try dragging these images around.
            </div>
          </div>
          <div
            id={styles.container}
            ref={(element) => {
              this.dragcontainer = element;
            }}
          >
            <Card
              description='My dream workplace.'
              image={'https://unsplash.it/1920/1080?random=1'}
              left='0px'
              ref={this.card1}
              top='0px'
            />
            <Card
              description='Loving life!'
              image={'https://unsplash.it/1920/1080?random=2'}
              left='600px'
              ref={this.card2}
              top='50px'
            />
            <Card
              description='2021, best year of our lives.'
              image={'https://unsplash.it/1920/1080?random=3'}
              left='650px'
              ref={this.card3}
              top='900px'
            />
            <Card
              description='Always having lots of fun!'
              image={'https://unsplash.it/1920/1080?random=4'}
              left='0px'
              ref={this.card4}
              top='850px'
            />
            <Card
              description='Never forget.'
              image={'https://unsplash.it/1920/1080?random=5'}
              left='350px'
              ref={this.card5}
              top='450px'
            />
          </div>
        </div>
      </div>
    );
  }
}

InteractiveMoodBoard.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  moveCursor: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  transitionStatus: PropTypes.string.isRequired,
};

export default WithTransition(InteractiveMoodBoard);
