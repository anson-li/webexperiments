import Home from './pages/Home';
import Work from './pages/Work';

export default [
  {
    key: 'work',
    Component: Work,
    path: {
      path: '/work',
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
