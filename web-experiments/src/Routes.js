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
import Work from './pages/Work';

const Routes = [
  {
    Component: Work,
    key: 'work',
    path: {
      path: '/work',
    },
  },
  {
    Component: InteractiveMoodBoard,
    key: 'moodboard',
    path: {
      path: '/moodboard',
    },
  },
  {
    Component: WebGLCurtains,
    key: 'webglcurtains',
    path: {
      path: '/webglcurtains',
    },
  },
  {
    Component: WebGLGallery,
    key: 'webglgallery',
    path: {
      path: '/webglgallery',
    },
  },
  {
    Component: DrumhellerConcept,
    key: 'drumheller',
    path: {
      path: '/drumheller',
    },
  },
  {
    Component: DinosaurLoader,
    key: 'dinosaurloader',
    path: {
      path: '/dinosaurloader',
    },
  },
  {
    Component: ASCIIShader,
    key: 'asciishader',
    path: {
      path: '/asciishader',
    },
  },
  {
    Component: AdditiveShader,
    key: 'additiveshader',
    path: {
      path: '/additiveshader',
    },
  },
  {
    Component: CoffeeCup,
    key: 'coffeecup',
    path: {
      path: '/coffeecup',
    },
  },
  {
    Component: Jellicent,
    key: 'jellicent',
    path: {
      path: '/jellicent',
    },
  },
  {
    Component: Home,
    key: 'home',
    path: {
      exact: true,
      path: '/',
    },
  },
];

export default Routes;
