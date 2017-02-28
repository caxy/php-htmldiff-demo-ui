import _ from 'lodash';
import { injectReducer } from '../../store/reducers';
import { injectMultipleSagas } from '../../store/sagas';
import { fetchAllDemos } from './modules/demo';

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Demo = require('./containers/DemoContainer').default;
      const reducer = require('./modules/demo').default;
      const sagas = require('./modules/demo').sagas;

      /*  Add the reducer to the store on key 'demo'  */
      injectReducer(store, { key: 'demo', reducer });

      /*  Return getComponent   */
      cb(null, Demo);

    /* Webpack named bundle   */
    }, 'demo')
  },
  onEnter (nextState, replace, callback) {
    console.log('onenter');
    store.dispatch(fetchAllDemos());
    callback();
  }
});
