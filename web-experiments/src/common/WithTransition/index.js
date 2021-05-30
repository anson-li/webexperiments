/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/prefer-await-to-then */
import React from 'react';
import {
  Transition,
} from 'react-transition-group';
import './style.scss';

export default function WithTransition (WrappedComponent) {
  return class extends React.Component {
    handleAnimateIn (done) {
      if (typeof this.wrappedComponent.animateIn === 'function') {
        const promise = this.wrappedComponent.animateIn();
        if (promise && typeof promise.then === 'function') {
          promise.then(done);
        } else {
          done();
        }
      }
    }

    handleAnimateOut (done) {
      const next = () => {
        if (done) {
          done();
        }
      };
      if (typeof this.wrappedComponent.animateOut === 'function') {
        const promise = this.wrappedComponent.animateOut();
        if (promise && typeof promise.then === 'function') {
          promise.then(next);
        } else {
          next();
        }
      } else {
        next();
      }
    }

    render () {
      return (
        <Transition
          {...this.props}
          addEndListener={(node, done) => {
            // eslint-disable-next-line react/prop-types
            if (this.props.in) {
              setTimeout(() => {
                this.handleAnimateIn(done);
              }, 1000);
            } else {
              this.handleAnimateOut(done);
            }
          }}
        >
          {(status) => {
            return <WrappedComponent
              ref={(element) => {
                this.wrappedComponent = element;
              }}
              {...this.props}
              transitionStatus={status}
            />;
          }}
        </Transition>
      );
    }
  };
}
