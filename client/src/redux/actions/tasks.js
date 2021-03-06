import { ADD_TASK, ADD_ONETASK,  DELETE_TASK, EDIT_TASK, COMPLETE_TASK, SAVE_TASK, FAILED_TASK , FAILED_ONETASK, CALL_SAVE_TASK, SET_VIEW_MODE} from './action-types';
import { loadingFailed, loadingSuccessful} from  './loading'


export function addDispatchTask(tasks) {
  return {
    type: ADD_TASK,
    // title:
    payload: tasks,
  }
}

export function addDispatchOneTask(task) {
  return {
    type: ADD_ONETASK,
    payload: task,
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

export function saveDispatchTask(id , title, description) {
  return {
    type: SAVE_TASK,
    title,
    description,
    id,
  }
}

export function completeDispatchTask(id, status) {
  return {
    type: COMPLETE_TASK,
    id,
    status,
  }
}

export function failedTask(err, step) {
  return {
    type: 'FAILED_TASK',
    errorFlg: true,
    step,
    err,
  }
}

export function failedOneTask(id, err, step) {
  return {
    type: 'FAILED_ONETASK',
    id,
    errorFlg: true,
    step,
    err,
  }
}


// for thunk
export function load() {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/tasks');
      const json = await response.json();

      dispatch(addDispatchTask(json));
      dispatch(loadingSuccessful());
    } catch (err) {
      dispatch(loadingFailed(err, 'getTasks' , err.message));
    }
  }
} 

// for thunk
export function add(taskName, taskDescription) {
  return async(dispatch) =>  {
    try {
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          title: taskName,
          status: 'open',
          description: taskDescription,
        })
      });

      const json = await response.json();
      console.log('json', json);
      dispatch(addDispatchOneTask(json));
    } 
    catch (err) {
      // error: concat(err.status, ': ', err.message)
      dispatch(failedOneTask(err, 'addOneTask'));
    }
  }
}


// action creator for SAGA
export function callSaveTask(id , title, description) {
  return {
    type: CALL_SAVE_TASK,
    id,
    title, 
    description,
  }
}
