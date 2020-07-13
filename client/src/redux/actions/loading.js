import {LOADING_STARTED, LOADING_SUCCESFUL, LOADING_FAILED} from './action-types';

export function loadingStarted() {
  return {
    type: LOADING_STARTED,
  }
}

export function loadingFailed(err) {
  return {
    type: LOADING_FAILED,
    payload: err,
    error: true,
  }
}

export function loadingSuccessful(tasks) {
  return {
    type: LOADING_SUCCESFUL,
    payload: tasks, 
  }
}
