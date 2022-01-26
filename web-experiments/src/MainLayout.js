import {
  gsap,
} from 'gsap';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import {
  TransitionGroup, Transition,
} from 'react-transition-group';
import Border from './common/Border';
import CustomCursor from './common/CustomCursor';
import Loader from './common/Loader';
import MobilePageOverlay from './common/MobilePageOverlay';
import Home from './pages/Home';
import Jellicent from './pages/ProjectList/01_Jellicent';
import CoffeeCup from './pages/ProjectList/02_CoffeeCup';
import ASCIIShader from './pages/ProjectList/03_ASCIIShader';
import AdditiveShader from './pages/ProjectList/04_AdditiveShader';
import DinosaurLoader from './pages/ProjectList/05_DinosaurLoader';
import DrumhellerConcept from './pages/ProjectList/06_DrumhellerConcept';
import WebGLCurtains from './pages/ProjectList/07_WebGLCurtains';
import WebGLGallery from './pages/ProjectList/08_WebGLGallery';
import InteractiveMoodBoard from './pages/ProjectList/09_InteractiveMoodBoard';
import GenerativeArt from './pages/ProjectList/10_GenerativeArt';
import SlideInText from './pages/ProjectList/11_SlideInText';
import InteractiveParticles from './pages/ProjectList/12_InteractiveParticles';
import DiagonalAnimated from './pages/ProjectList/13_DiagonalAnimated';
import KineticType from './pages/ProjectList/14_KineticType';
import Work from './pages/Work';
import {
  play, exit,
} from './timelines';

class MainLayout extends PureComponent {
  constructor (props) {
    super(props);
    this.handleExitHandler = this.handleExitHandler.bind(this);
    this.handleEnterHandler = this.handleEnterHandler.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.onCursorHover = this.onCursorHover.bind(this);
    this.onCursorUnhover = this.onCursorUnhover.bind(this);
    this.hideFollow = this.hideFollow.bind(this);
    this.showFollow = this.showFollow.bind(this);
    this.moveCursor = this.moveCursor.bind(this);
    this.completeCall = this.completeCall.bind(this);

    this.loader = React.createRef();
    this.cursor = React.createRef();
    this.parentNode = React.createRef();
  }

  completeCall (target, parent) {
    gsap.set(target, {clearProps: 'position, width'});
    parent && gsap.set(parent, {clearProps: 'overflow'});
  }

  onCursorHover () {
    this.cursor.current.hoverFunc();
  }

  onCursorUnhover () {
    this.cursor.current.unhoverFunc();
  }

  showLoader () {
    this.loader.current.fadeIn();
  }

  hideLoader () {
    if (this.loader.current) {
      this.loader.current.fadeOut();
    }
  }

  hideFollow () {
    this.cursor.current.hideFollow();
  }

  showFollow () {
    this.cursor.current.showFollow();
  }

  moveCursor (event) {
    // this.cursor.current.moveCircle(event);
  }

  handleEnterHandler (node) {
    setTimeout(() => {
      this.hideLoader();
    }, 1000);
  }

  handleExitHandler (node) {
    this.showLoader();
  }

  render () {
    const componentProps = {
      cursorHover: this.onCursorHover,
      cursorUnhover: this.onCursorUnhover,
      hideFollow: this.hideFollow,
      moveCursor: this.moveCursor,
      showFollow: this.showFollow,
    };

    return (
      <>
        <MobilePageOverlay />
        <CustomCursor ref={this.cursor} />
        <div className='fixed-header'>
          <Border />
        </div>
        <Loader ref={this.loader} />
        <div
          className='w-full min-h-screen'
          ref={this.parentNode}>
          <TransitionGroup component={null}>
            <Transition
              appear
              key={this.props.location.pathname}
              onEnter={(node, appears) => {
                return play(node, appears, this.loader.current);
              }}
              onExit={(node, appears) => {
                return exit(node, appears, this.loader.current);
              }}
              timeout={{enter: 2000,
                exit: 1000}}
            >
              <Switch location={this.props.location}>
                <Route exact path='/'>
                  <Home
                    {...componentProps}
                  />
                </Route>
                <Route path='/slideintext'>
                  <SlideInText
                    {...componentProps}
                  />
                </Route>
                <Route path='/work'>
                  <Work
                    {...componentProps}
                  />
                </Route>
                <Route path='/generativeart'>
                  <GenerativeArt
                    {...componentProps}
                  />
                </Route>
                <Route path='/moodboard'>
                  <InteractiveMoodBoard
                    {...componentProps}
                  />
                </Route>
                <Route path='/webglcurtains'>
                  <WebGLCurtains
                    {...componentProps}
                  />
                </Route>
                <Route path='/webglgallery'>
                  <WebGLGallery
                    {...componentProps}
                  />
                </Route>
                <Route path='/drumheller'>
                  <DrumhellerConcept
                    {...componentProps}
                  />
                </Route>
                <Route path='/dinosaurloader'>
                  <DinosaurLoader
                    {...componentProps}
                  />
                </Route>
                <Route path='/asciishader'>
                  <ASCIIShader
                    {...componentProps}
                  />
                </Route>
                <Route path='/additiveshader'>
                  <AdditiveShader
                    {...componentProps}
                  />
                </Route>
                <Route path='/coffeecup'>
                  <CoffeeCup
                    {...componentProps}
                  />
                </Route>
                <Route path='/jellicent'>
                  <Jellicent
                    {...componentProps}
                  />
                </Route>
                <Route path='/interactiveparticles'>
                  <InteractiveParticles
                    {...componentProps}
                  />
                </Route>
                <Route path='/diagonalanimated'>
                  <DiagonalAnimated
                    {...componentProps}
                  />
                </Route>
                <Route path='/kinetictype'>
                  <KineticType
                    {...componentProps}
                  />
                </Route>
                <Route>
                  <Home
                    {...componentProps}
                  />
                </Route>
              </Switch>
            </Transition>
          </TransitionGroup>
        </div>
      </>
    );
  }
}

MainLayout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default MainLayout;
