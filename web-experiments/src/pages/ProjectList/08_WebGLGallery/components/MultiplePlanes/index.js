/* eslint-disable react/jsx-no-bind */
import {
  Vec2, Vec3,
} from 'curtainsjs';
import {
  TweenLite, Power0, Power4, gsap,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import {
  PropTypes,
} from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Curtains,
} from 'react-curtains';
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
    this.selectDeformations = 0;

    this.childSplit = null;
    this.childButton = null;

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
    this.handlePlaneMouseOut = this.handlePlaneMouseOut.bind(this);
    this.handlePlaneMouseOver = this.handlePlaneMouseOver.bind(this);
    this.setupCloseButton = this.setupCloseButton.bind(this);
    this.setupInitialScrollAnimation = this.setupInitialScrollAnimation.bind(this);
  }

  componentDidMount () {
    this.setupPlanes();
    this.setupCloseButton();
    this.childSplit = new SplitText(this.fullscreentext, {
      linesClass: 'inview-split-child',
      type: 'lines',
    });
    // eslint-disable-next-line no-new
    new SplitText(this.fullscreentext, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
    this.childButton = new SplitText(this.closebutton, {
      linesClass: 'inview-split-child',
      type: 'lines',
    });
    // eslint-disable-next-line no-new
    new SplitText(this.closebutton, {
      linesClass: 'inview-split-parent',
      type: 'lines',
    });
  }

  setupInitialScrollAnimation () {
    this.planesref.scrollTop = 2500;
    this.props.hideLoader();
    setTimeout(() => {
      this.planesref.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: 0,
      });
    }, 1000);
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

        const allOtherPlanes = this.planes.filter((el) => {
          return el.uuid !== fullScreenPlane.uuid;
        });
        gsap.to(this, 1, {
          ease: Power4,
          onUpdate: () => {
            allOtherPlanes.forEach((el) => {
              el.uniforms.planeLostFocusDepth.value = this.selectDeformations;
            });
          },
          selectDeformations: 0,
        });
        gsap.to(this.childSplit.lines, {
          duration: 1,
          ease: 'power4',
          yPercent: -100,
        });
        gsap.to(this.childButton.lines, {
          duration: 1,
          ease: 'power4',
          yPercent: -100,
        });

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
            fullScreenPlane.setRenderOrder(0);
            this.galleryState.closeTween = null;
            this.curtain.needRender();
            gsap.set(this.fullscreentext, {
              opacity: 0,
              zIndex: -1,
            });
            gsap.set(this.childSplit.lines, {
              yPercent: 0,
            });
            gsap.set(this.closebutton, {
              opacity: 0,
              zIndex: -1,
            });
            gsap.set(this.childButton.lines, {
              yPercent: 0,
            });
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
      this.calculatePlaneUniforms(plane);
    });
  }

  calculatePlaneUniforms (plane) {
    plane.uniforms.planeDeformation.value =
      Math.abs(this.planesDeformations) * (plane._boundingRect.document.top - window.innerHeight / 2) / (window.innerHeight / 2);

    plane.uniforms.planePosition.value =
      1 - Math.abs(Math.min(Math.max(plane._boundingRect.document.top, 0), window.innerHeight) - window.innerHeight / 2) / (window.innerHeight / 2);

    plane.uniforms.planeVelocity.value = Math.min(Math.max(Math.abs(this.planesDeformations), 0), 10);
  }

  handlePlaneClick (event, plane) {
    if (!this.galleryState.fullscreen) {
      this.galleryState.fullscreen = true;
      plane.userData.isFullscreen = true;
      plane.setRenderOrder(1);
      plane.uniforms.time.value = 0;
      const planeBoundingRect = plane.getBoundingRect();
      const curtainBoundingRect = this.curtain.getBoundingRect();

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

      const nonClickedPlanes = this.planes.filter((el) => {
        return el.uuid !== plane.uuid;
      });
      gsap.to(this, 1, {
        ease: Power4,
        onUpdate: () => {
          nonClickedPlanes.forEach((el) => {
            el.uniforms.planeLostFocusDepth.value = this.selectDeformations;
          });
        },
        selectDeformations: -1,
      });
      gsap.to(plane.uniforms.hoverProgress, 0.5, {
        ease: 'expo.inOut',
        value: 0,
      });

      gsap.set(this.fullscreentext, {
        delay: 0.5,
        opacity: 1,
        zIndex: 10,
      });
      gsap.from(this.childSplit.lines, {
        delay: 0.5,
        duration: 1.5,
        ease: 'power4',
        yPercent: 100,
      });
      gsap.set(this.closebutton, {
        delay: 0.5,
        opacity: 1,
        zIndex: 10,
      });
      gsap.from(this.closebutton, {
        delay: 0.5,
        duration: 1.5,
        ease: 'power4',
        yPercent: 100,
      });

      plane.setTransformOrigin(newTranslation);
      this.galleryState.openTween = gsap.to(animation, 1, {
        ease: Power4.easeInOut,
        mouseX: 0,
        mouseY: 0,
        onComplete: () => {
          // clear tween
          this.galleryState.openTween = null;
          this.curtain.needRender();
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
        scaleX: curtainBoundingRect.width / planeBoundingRect.width,
        scaleY: curtainBoundingRect.height / planeBoundingRect.height,
        textureScale: 1,
        transition: 1,
        translationX: -1 * planeBoundingRect.left / this.curtain.pixelRatio,
        translationY: -1 * planeBoundingRect.top / this.curtain.pixelRatio,
      });
    }
  }

  handlePlaneMouseOver (event, plane) {
    if (!this.galleryState.fullscreen) {
      gsap.to(plane.uniforms.hoverProgress, 0.25, {
        ease: 'expo.inOut',
        onUpdate: () => {
          this.curtain.needRender();
        },
        value: 1,
      });
    }
  }

  handlePlaneMouseOut (event, plane) {
    if (!this.galleryState.fullscreen) {
      gsap.to(plane.uniforms.hoverProgress, 0.5, {
        ease: 'expo.inOut',
        onUpdate: () => {
          this.curtain.needRender();
        },
        value: 0,
      });
    }
  }

  handlePlaneReady (plane) {
    plane.htmlElement.addEventListener('mouseover', (event) => {
      this.handlePlaneMouseOver(event, plane);
    });
    plane.htmlElement.addEventListener('mouseout', (event) => {
      this.handlePlaneMouseOut(event, plane);
    });
    plane.htmlElement.addEventListener('click', (event) => {
      this.handlePlaneClick(event, plane);
    });
    this.planes.push(plane);

    // Check when all planes have loaded
    if (this.planes.length === this.state.nbPlanes) {
      this.curtain.needRender();
      this.setupInitialScrollAnimation();
    }
  }

  buildPlane (index) {
    return (
      <SinglePlane
        index={index}
        key={index}
        onPlaneReady={this.handlePlaneReady}
      />
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
    this.curtain.needRender();
  }

  render () {
    return (
      <div
        className='viewport'
        ref={(element) => {
          this.curtainsref = element;
        }}
        style={{height: window.innerHeight}}
      >
        <div
          className='fullscreen-text'
          ref={(element) => {
            this.fullscreentext = element;
          }}
        >
          PROJ ECT<br />
          NAM E
        </div>
        <div
          className='close-button'
          ref={(element) => {
            this.closebutton = element;
          }}
        >X</div>
        <Curtains
          onScroll={this.scrollCurtain.bind(this)}
          onSuccess={this.handleSetupCurtain}
          pixelRatio={Math.min(1.5, window.devicePixelRatio)}
        >
          <div
            className='multiple-planes'
            onScroll={this.handleScroll}
            ref={(element) => {
              this.planesref = element;
            }}
          >
            <div
              className='multiple-planes-wrapper'
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

MultiplePlanes.propTypes = {
  hideLoader: PropTypes.func.isRequired,
};

export default MultiplePlanes;
