import {
  gsap,
} from 'gsap';
import PropTypes from 'prop-types';
import React, {
  useRef, PureComponent,
} from 'react';
import {
  BrowserRouter as Router, Switch, Route,
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
import Work from './pages/Work';
import RoutesConfig from './RoutesConfig';

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
    this.cursor.current.moveCircle(event);
  }

  handleEnterHandler (node) {
    gsap.killTweensOf(node);
    // this.hideLoader();

    // Set initial position and styles
    gsap.set(node, {
      autoAlpha: 0,
      left: 0,
      position: 'absolute',
      y: 100,
    });
    gsap.set(this.parentNode.current, {overflow: 'hidden'});

    // Create the animation for the incoming component
    gsap.to(node, {
      autoAlpha: 1,
      duration: 2,
      onComplete: this.completeCall,
      onCompleteParams: [node, this.parentNode.current],
      y: 0,
    });
  }

  handleExitHandler (node) {
    gsap.killTweensOf(node);
    // this.showLoader();

    // Set initial position and styles
    gsap.set(node, {
      left: 0,
      position: 'absolute',
    });

    // Create the animation for the incoming component
    gsap.to(node, {
      autoAlpha: 0,
      duration: 2,
      y: -100,
    });
  }

  render () {
    const componentProps = {
      cursorHover: this.onCursorHover,
      cursorUnhover: this.onCursorUnhover,
      hideFollow: this.hideFollow,
      hideLoader: this.hideLoader,
      moveCursor: this.moveCursor,
      showFollow: this.showFollow,
      showLoader: this.showLoader,
    };

    RoutesConfig.map(({Component, path}) => {
      console.log((<Route path={path}>
        <Component
          {...componentProps}
        />
      </Route>));
    });

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
              key={this.props.location.pathname}
              onEnter={this.handleEnterHandler}
              onExit={this.handleExitHandler}
              timeout={500}
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