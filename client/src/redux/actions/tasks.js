import { ADD_TASK, ADD_ONETASK,  DELETE_TASK, EDIT_TASK, COMPLETE_TASK, SAVE_TASK } from './action-types';



export function addDispatchTask(data) {
  return {
    type: ADD_TASK,
    // title:
    payload: data,
  }
}

export function addDispatchOneTask(title) {
  return {
    type: ADD_ONETASK,
    title
  }
}

export function deleteDispatchTask(id) {
  return {
    type: DELETE_TASK,
    id,
  }
}
export function editDispatchTask(id) {
  return {
    type: EDIT_TASK,
    id,
  }
}

export function saveDispatchTask(title, id) {
  return {
    type: SAVE_TASK,
    title,
    id,
  }
}

export function completeDispatchTask(id) {
  return {
    type: COMPLETE_TASK,
    id,
  }
}
