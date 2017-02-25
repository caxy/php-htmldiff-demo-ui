import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';

// ------------------------------------
// Constants
// ------------------------------------
export const DEMO_INCREMENT = 'DEMO_INCREMENT';
export const DEMO_DOUBLE = 'DEMO_DOUBLE';
export const DEMO_DOUBLE_ASYNC = 'DEMO_DOUBLE_ASYNC';

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : DEMO_INCREMENT,
    payload : value
  }
}

export function double () {
  return {
    type    : DEMO_DOUBLE
  }
}

export function doubleAsync () {
  return { type: DEMO_DOUBLE_ASYNC };
}

export const actions = {
  increment,
  double,
  doubleAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DEMO_INCREMENT]    : (state, action) => state + action.payload,
  [DEMO_DOUBLE] : (state, action) => state * 2
};

// ------------------------------------
// Sagas
// ------------------------------------
// Our worker Saga: will perform the async increment task
export function* doDoubleAsync() {
  yield call(delay, 1000);
  yield put(double());
}

// Our watcher Saga: spawn a new doubleAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery(DEMO_DOUBLE_ASYNC, doDoubleAsync);
}

// Export the sagas, which is used in ./../index.js to add them to the store.
export const sagas = {
  watchIncrementAsync
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function demoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
