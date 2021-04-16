/* eslint-disable radix */
/* eslint-disable react/jsx-no-bind */
import {
  Vec2, Vec3,
} from 'curtainsjs';
import {
  TweenLite, Power0, Power4, gsap,
} from 'gsap';
import React, {
  PureComponent,
} from 'react';
import {
  Curtains,
} from 'react-curtains';
import {
  animateScroll as scroll,
} from 'react-scroll';
import SinglePlane from '../SinglePlane';
import './style.scss';

class MultiplePlanes extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      allPlanes: [],
      nbPlanes: 48,
    };
    this.planes = [];
    this.allPlanes = [];
    this.curtain = null;
    this.planesDeformations = 0;
    this.previousY = 0;
    this.scroll = 0;

    this.galleryState = {
      closeTween: null,
      fullscreen: false,
      openTween: null,
    };

    this.handlePlaneReady = this.handlePlaneReady.bind(this);
    this.setupPlanes = this.setupPlanes.bind(this);
    this.handleSetupCurtain = this.handleSetupCurtain.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handlePlaneClick = this.handlePlaneClick.bind(this);
    this.setupCloseButton = this.setupCloseButton.bind(this);
  }

  componentDidMount () {
    this.setupPlanes();
    this.setupCloseButton();
  }

  setupCloseButton () {
    this.closebutton.addEventListener('click', () => {
      const fullScreenPlane = this.planes.find((plane) => {
        return plane.userData.isFullscreen;
      });

      // if there's a plane actually displayed fullscreen, we'll be shrinking it back to normal
      if (fullScreenPlane && this.galleryState.fullscreen) {
        this.galleryState.fullscreen = false;
        fullScreenPlane.userData.isFullscreen = false;
        this.closebutton.style.display = 'none';
        fullScreenPlane.uniforms.time.value = 0;

        // object that will be tweened
        const animation = {
          // current scale and translation values
          scaleX: fullScreenPlane.scale.x,
          scaleY: fullScreenPlane.scale.y,
          textureScale: 1,
          transition: 1,
          translationX: fullScreenPlane.relativeTranslation.x,
          translationY: fullScreenPlane.relativeTranslation.y,
        };

        // create vectors only once and use them later on during tween onUpdate callback
        const newScale = new Vec2();
        const newTranslation = new Vec3();

        // kill tween
        if (this.galleryState.closeTween) {
          this.galleryState.closeTween.kill();
        }

        this.galleryState.closeTween = gsap.to(animation, 1, {
          ease: Power4.easeInOut,
          onComplete: () => {
            console.log(this.galleryState);
            fullScreenPlane.setRenderOrder(0);
            this.galleryState.closeTween = null;
          },
          onUpdate: () => {
            // plane scale
            newScale.set(animation.scaleX, animation.scaleY);
            fullScreenPlane.setScale(newScale);

            // plane translation
            newTranslation.set(animation.translationX, animation.translationY, 0);
            fullScreenPlane.setRelativeTranslation(newTranslation);

            // texture scale
            newScale.set(animation.textureScale, animation.textureScale);
            fullScreenPlane.textures[0].setScale(newScale);

            // transition
            fullScreenPlane.uniforms.fullscreenTransition.value = animation.transition;

            this.curtain.needRender();
          },
          scaleX: 1,
          scaleY: 1,
          textureScale: 1.5,
          transition: 0,
          translationX: 0,
          translationY: 0,
        });
      }
    });
  }

  handleScroll (event) {
    if (!this.galleryState.fullscreen) {
      TweenLite.to(this, 1, {
        ease: Power0,
        onComplete: () => {
          this.updateScroll(0, this.scroll);
        },
        onUpdate: () => {
          this.updateScroll(0, this.scroll);
        },
        scroll: event.target.scrollTop,
      });
    }
  }

  setupPlanes () {
    const allPlanes = [];
    for (let index = 0; index < this.state.nbPlanes; index++) {
      allPlanes.push(this.buildPlane(index));
    }
    this.setState({allPlanes});
  }

  scrollCurtain (curtains) {
    // get scroll deltas to apply the effect on scroll
    const delta = curtains.getScrollDeltas();

    // invert value for the effect
    delta.y = -delta.y;

    // threshold
    if (delta.y > 10) {
      delta.y = 10;
    } else if (delta.y < -10) {
      delta.y = -10;
    }

    if (Math.abs(delta.y) > Math.abs(this.planesDeformations)) {
      this.planesDeformations = curtains.lerp(Math.abs(this.planesDeformations), delta.y * 1.5, 1);
    }

    this.planes.forEach((plane) => {
      plane.uniforms.planeDeformation.value =
      Math.abs(this.planesDeformations) * (plane._boundingRect.document.top - window.innerHeight / 2) / (window.innerHeight / 2);

      plane.uniforms.planePosition.value =
        1 - Math.abs(Math.min(Math.max(plane._boundingRect.document.top, 0), window.innerHeight) - window.innerHeight / 2) / (window.innerHeight / 2);

      plane.uniforms.planeVelocity.value = Math.min(Math.max(Math.abs(this.planesDeformations), 0), 10);
    });
  }

  handlePlaneClick (event, plane) {
    if (!this.galleryState.fullscreen) {
      this.galleryState.fullscreen = true;
      plane.userData.isFullscreen = true;
      plane.setRenderOrder(1);
      plane.uniforms.time.value = 0;
      const planeBoundingRect = plane.getBoundingRect();
      const curtainBoundingRect = this.curtain.getBoundingRect();

      console.log(scroll);
      scroll.scrollTo(100);

      const animation = {
        mouseX: 0.5,
        mouseY: 0.5,
        scaleX: 1,
        scaleY: 1,
        textureScale: 1.5,
        transition: 0,
        translationX: 0,
        translationY: 0,
      };

      const newScale = new Vec2();
      const newTranslation = new Vec3();

      if (this.galleryState.openTween) {
        this.galleryState.openTween.kill();
      }

      plane.setTransformOrigin(newTranslation);
      this.galleryState.openTween = gsap.to(animation, 1, {
        ease: Power4.easeInOut,
        mouseX: 0,
        mouseY: 0,
        onComplete: () => {
          // clear tween
          this.galleryState.openTween = null;
          this.closebutton.style.display = 'block';
        },
        onUpdate: () => {
          // plane scale
          newScale.set(animation.scaleX, animation.scaleY);
          plane.setScale(newScale);

          // plane translation
          newTranslation.set(animation.translationX, animation.translationY, 0);
          plane.setRelativeTranslation(newTranslation);

          // texture scale
          newScale.set(animation.textureScale, animation.textureScale);
          plane.textures[0].setScale(newScale);

          // transition value
          plane.uniforms.fullscreenTransition.value = animation.transition;

          this.curtain.needRender();
        },
        scaleX: 1240 / planeBoundingRect.width,
        scaleY: 700 / planeBoundingRect.height,
        textureScale: 1,
        transition: 1,
        translationX: -350, // / this.curtain.pixelRatio,
        translationY: -350, // / this.curtain.pixelRatio,
      });
    }
  }

  handlePlaneReady (plane) {
    plane.htmlElement.addEventListener('click', (event) => {
      this.handlePlaneClick(event, plane);
    });
    this.planes.push(plane);
  }

  buildPlane (index) {
    return (
      <SinglePlane index={index} key={index} onPlaneReady={this.handlePlaneReady} />
    );
  }

  updateScroll (xOffset, yOffset) {
    // update our scroll manager values
    if (this.curtain) {
      this.curtain.updateScrollValues(xOffset, yOffset);
      this.curtain.needRender();
    }
  }

  handleSetupCurtain (curtain) {
    curtain.disableDrawing();
    this.curtain = curtain;
  }

  render () {
    return (
      <div
        className='viewport'
        ref={(e) => {
          this.curtainsref = e;
        }}
        style={{height: window.innerHeight}}
      >
        <div
          className='close-button'
          ref={(e) => {
            this.closebutton = e;
          }}
        >X</div>
        <Curtains
          onScroll={this.scrollCurtain.bind(this)}
          onSuccess={this.handleSetupCurtain}
          pixelRatio={Math.min(1.5, window.devicePixelRatio)}
        >
          <div
            className='MultiplePlanes'
            onScroll={this.handleScroll}
            ref={(e) => {
              this.planesref = e;
            }}
          >
            <div
              className='MultiplePlanes-wrapper'
            >
              {this.state.allPlanes.map((planeEl) => {
                return planeEl;
              })}
            </div>
          </div>
        </Curtains>
      </div>
    );
  }
}

export default MultiplePlanes;
