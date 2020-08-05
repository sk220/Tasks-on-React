import { takeEvery, put, call }  from 'redux-saga/effects';
import { CALL_SAVE_TASK }  from './actions/action-types';
import { saveDispatchTask, failedOneTask } from './actions/tasks';


//async func fetch
async function fetchSave(id, title, description) {
      const response  = await fetch (`/api/task/edit/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newTitle: `${title}`,
          newDescription: `${description}`,
        })
      });
      return response.json();
}

//worker 
function* workerSaveTask(action) {
  try {
    const taskToSave = yield call(fetchSave, action.id, action.title, action.description);
    console.log(taskToSave);
    yield put(saveDispatchTask(action.id, action.title, action.description));
  }
  catch(err) {
    console.log("error!: ", err);
    yield put(failedOneTask(action.id, err, 'editTask'));
  }
}


//watcher 
export default function* watcher(action) {
  yield takeEvery(CALL_SAVE_TASK, workerSaveTask);
}
