import {LOADING_SUCCESFUL, LOADING_FAILED, LOADING_STARTED} from '../actions/action-types';

const initialStateLoading = {
  loading: true,
  error: false,
  // data: null,
}

export default (state=initialStateLoading, action) => {  // reducer
  switch (action.type) {
    case LOADING_STARTED:
      return {
        ...state, 
        loading: true,
        error: false,
      }

    case LOADING_FAILED:
      return  { 
        ...state, 
        loading: false,
        error: true,
      }

    case LOADING_SUCCESFUL:
      return  { 
        ...state, 
        loading: false,
        error: false,
      }
    default:
      return state;
  }
}
