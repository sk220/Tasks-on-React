import { SET_VIEW_MODE } from './action-types';

export default function setViewMode(viewMode,viewStatus) {
  return {
    type: SET_VIEW_MODE,
    viewMode,
    viewStatus,
  }
}
