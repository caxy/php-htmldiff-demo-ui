import { put, call, takeEvery, fork } from 'redux-saga/effects';
import Api from 'utils/api';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_HTML_OLD = 'demo/SET_HTML_OLD';
export const SET_HTML_NEW = 'demo/SET_HTML_NEW';
export const SET_HTML_DIFF = 'demo/SET_HTML_DIFF';
export const FETCH_HTML_DIFF = 'demo/FETCH_HTML_DIFF';
export const REQUEST_HTML_DIFF = 'demo/REQUEST_HTML_DIFF';
export const RECEIVE_HTML_DIFF_SUCCESS = 'demo/RECEIVE_HTML_DIFF_SUCCESS';
export const RECEIVE_HTML_DIFF_FAILURE = 'demo/RECEIVE_HTML_DIFF_FAILURE';

export const FETCH_ALL_DEMOS = 'demo/FETCH_ALL_DEMOS';
export const REQUEST_ALL_DEMOS = 'demo/REQUEST_ALL_DEMOS';
export const RECEIVE_ALL_DEMOS_SUCCESS = 'demo/RECEIVE_ALL_DEMOS_SUCCESS';
export const RECEIVE_ALL_DEMOS_FAILURE = 'demo/RECEIVE_ALL_DEMOS_FAILURE';

export const SELECT_DEMO = 'demo/SELECT_DEMO';
export const REQUEST_DEMO = 'demo/REQUEST_DEMO';
export const RECEIVE_DEMO_SUCCESS = 'demo/RECEIVE_DEMO_SUCCESS';
export const RECEIVE_DEMO_FAILURE = 'demo/RECEIVE_DEMO_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function setHtmlOld (html) {
  return { type: SET_HTML_OLD, payload: { html } };
}

export function setHtmlNew (html) {
  return { type: SET_HTML_NEW, payload: { html } };
}

export function setHtmlDiff (html) {
  return { type: SET_HTML_DIFF, payload: { html } };
}

export function fetchHtmlDiff (values) {
  const { htmlOld, htmlNew } = values;

  return { type: FETCH_HTML_DIFF, payload: { htmlOld, htmlNew } };
}

export function requestHtmlDiff () {
  return { type: REQUEST_HTML_DIFF };
}

export function receiveHtmlDiffSuccess (html) {
  return { type: RECEIVE_HTML_DIFF_SUCCESS, payload: { html } };
}

export function receiveHtmlDiffFailure (error) {
  return { type: RECEIVE_HTML_DIFF_FAILURE, payload: { error } };
}

export function fetchAllDemos () {
  return { type: FETCH_ALL_DEMOS };
}

export function requestAllDemos () {
  return { type: REQUEST_ALL_DEMOS };
}

export function receiveAllDemosSuccess (demos) {
  return { type: RECEIVE_ALL_DEMOS_SUCCESS, payload: { demos } };
}

export function receiveAllDemosFailure (error) {
  return { type: RECEIVE_ALL_DEMOS_FAILURE, payload: { error } };
}

export function selectDemo (demo) {
  return { type: SELECT_DEMO, payload: { demo } };
}

export const actions = {
  setHtmlOld,
  setHtmlNew,
  setHtmlDiff,
  fetchHtmlDiff,
  requestHtmlDiff,
  receiveHtmlDiffSuccess,
  receiveHtmlDiffFailure,
  fetchAllDemos,
  requestAllDemos,
  receiveAllDemosSuccess,
  receiveAllDemosFailure,
  selectDemo
};

// ------------------------------------
// Sagas
// ------------------------------------
// Our worker Saga: will perform the async increment task
export function* doFetchHtmlDiff ({payload}) {
  yield put(requestHtmlDiff());

  try {
    const htmlDiff = yield call([Api, Api.getHtmlDiff], payload.htmlOld, payload.htmlNew);
    yield put(receiveHtmlDiffSuccess(htmlDiff));
  } catch (error) {
    yield put(receiveHtmlDiffFailure(error));
  }
}

// Our watcher Saga: spawn a new doubleAsync task on each INCREMENT_ASYNC
export function* watchFetchHtmlDiff () {
  yield takeEvery(FETCH_HTML_DIFF, doFetchHtmlDiff);
}

export function* doFetchAllDemos () {
  yield put(requestAllDemos());

  try {
    const demos = yield call([Api, Api.getDemos]);
    yield put(receiveAllDemosSuccess(demos));
  } catch (error) {
    console.error(error);
    yield put(receiveAllDemosFailure(error));
  }
}

export function* watchFetchAllDemos () {
  yield takeEvery(FETCH_ALL_DEMOS, doFetchAllDemos);
}

// Export the sagas, which is used in ./../index.js to add them to the store.
export const sagas = {
  watchFetchHtmlDiff,
  watchFetchAllDemos
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_HTML_OLD]: (state, {payload}) => Object.assign({}, state, {
    htmlOld: payload.html
  }),
  [SET_HTML_NEW]: (state, {payload}) => Object.assign({}, state, {
    htmlNew: payload.html
  }),
  [SET_HTML_DIFF]: (state, {payload}) => Object.assign({}, state, {
    htmlDiff: payload.html
  }),
  [REQUEST_HTML_DIFF]: (state, {payload}) => Object.assign({}, state, {
    htmlDiff: null,
    isLoading: true,
    isError: false,
    error: null
  }),
  [RECEIVE_HTML_DIFF_SUCCESS]: (state, {payload}) => Object.assign({}, state, {
    htmlDiff: payload.html,
    isLoading: false,
    isError: false,
    error: null
  }),
  [RECEIVE_HTML_DIFF_FAILURE]: (state, {payload}) => Object.assign({}, state, {
    htmlDiff: null,
    isLoading: false,
    isError: true,
    error: payload.message
  }),
  [REQUEST_ALL_DEMOS]: (state, {payload}) => Object.assign({}, state, {
    demos: [],
    selectedDemo: null
  }),
  [RECEIVE_ALL_DEMOS_SUCCESS]: (state, {payload}) => Object.assign({}, state, {
    demos: payload.demos
  }),
  [RECEIVE_ALL_DEMOS_FAILURE]: (state, {payload}) => Object.assign({}, state, {
    demos: [],
    selectedDemo: null
  }),
  [SELECT_DEMO]: (state, {payload}) => {
    const demo = state.demos.find(item => item.id === payload.demo);
    return Object.assign({}, state, {
      selectedDemo: demo,
      htmlOld: demo.htmlOld,
      htmlNew: demo.htmlNew
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  htmlOld: '',
  htmlNew: '',
  htmlDiff: null,
  isLoading: false,
  isError: false,
  error: null,
  selectedDemo: null,
  demos: []
};
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
