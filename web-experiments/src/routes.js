import Home from './pages/Home';
import Jellicent from './pages/ProjectList/01_Jellicent';
import CoffeeCup from './pages/ProjectList/02_CoffeeCup';
import ASCIIShader from './pages/ProjectList/03_ASCIIShader';
import AdditiveShader from './pages/ProjectList/04_AdditiveShader';
import DinosaurLoader from './pages/ProjectList/05_DinosaurLoader';
import DrumhellerConcept from './pages/ProjectList/06_DrumhellerConcept';
import WebGLCurtains from './pages/ProjectList/07_WebGLCurtains';
import Work from './pages/Work';

const Routes = [
  {
    key: 'work',
    Component: Work,
    path: {
      path: '/work',
    },
  },
  {
    key: 'webglcurtains',
    Component: WebGLCurtains,
    path: {
      path: '/webglcurtains',
    },
  },
  {
    key: 'drumheller',
    Component: DrumhellerConcept,
    path: {
      path: '/drumheller',
    },
  },
  {
    key: 'dinosaurloader',
    Component: DinosaurLoader,
    path: {
      path: '/dinosaurloader',
    },
  },
  {
    key: 'asciishader',
    Component: ASCIIShader,
    path: {
      path: '/asciishader',
    },
  },
  {
    key: 'additiveshader',
    Component: AdditiveShader,
    path: {
      path: '/additiveshader',
    },
  },
  {
    key: 'coffeecup',
    Component: CoffeeCup,
    path: {
      path: '/coffeecup',
    },
  },
  {
    key: 'jellicent',
    Component: Jellicent,
    path: {
      path: '/jellicent',
    },
  },
  {
    key: 'home',
    Component: Home,
    path: {
      path: '/',
      exact: true,
    },
  },
];

export default Routes;
