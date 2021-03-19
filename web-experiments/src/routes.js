import Home from './pages/Home';
import AdditiveShader from './pages/ProjectList/AdditiveShader';
import ASCIIShader from './pages/ProjectList/ASCIIShader';
import CoffeeCup from './pages/ProjectList/CoffeeCup';
import DinosaurLoader from './pages/ProjectList/DinosaurLoader';
import Jellicent from './pages/ProjectList/Jellicent';
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