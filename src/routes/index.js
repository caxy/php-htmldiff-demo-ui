// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout';
import Home from './Home';
import DemoRoute from './Demo';
import LoginRoute from './Login';
import UserRoute from './User';

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    DemoRoute(store),
    LoginRoute(store),
    UserRoute(store)
  ]
});

export default createRoutes
