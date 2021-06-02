/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/prefer-await-to-then */
import {
  gsap,
} from 'gsap';

const getDefaultTimeline = (node, delay, loader) => {
  const timeline = new gsap.timeline({paused: true});
  timeline.from(node, 1, {
    autoAlpha: 0,
    delay,
  }).to(loader.loader, 1, {
    autoAlpha: 0,
  });

  return timeline;
};

export const play = (node, appears, loader) => {
  const delay = appears ? 0 : 1;
  const timeline = getDefaultTimeline(node, delay, loader);

  window.loadPromise.then(() => {
    return requestAnimationFrame(() => {
      return timeline.play();
    });
  });
};

export const exit = (node, appears, loader) => {
  const timeline = new gsap.timeline({paused: true});

  timeline.to(loader.loader, 1, {
    autoAlpha: 1,
  });
  timeline.play();
};
