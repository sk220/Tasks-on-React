// inpo { setViewMode } = require("../actions/settings")
import {SET_VIEW_MODE} from '../actions/action-types';

export default (state=[], action) => {  // reducer

  switch (action.type) {
    case SET_VIEW_MODE:
      return {
        ...state, 
        viewMode: action.viewMode,
        viewStatus: action.viewStatus,
      }

    default:
        return state;
  }
};
  