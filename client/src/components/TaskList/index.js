import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editDispatchTask, deleteDispatchTask, completeDispatchTask, failedOneTask,load, callSaveTask } from '../../redux/actions/tasks'; 
import { loadingStarted} from '../../redux/actions/loading';
import TaskItem from '../TaskItem';
import Loading from '../Loading';

function TaskList() {
  
  const dispatch = useDispatch();
  
  const viewStatus = useSelector((state) => state.settings.viewStatus);
  const viewMode = useSelector((state) => state.settings.viewMode);
  const tasks = useSelector((state) => state.tasks);

  const error = useSelector((state) => state.loadStatus.error);
  const loading = useSelector((state) => state.loadStatus.loading);

// на thunk
  useEffect(() => {
      dispatch(loadingStarted());
      dispatch(load());
  }, [dispatch]);

  async function deleteTask(id) {
    try {
      debugger;
      const response  = await fetch (`/api/task/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      await response.json(); //? как отправить диспатч после получения результата или так ок?
      dispatch(deleteDispatchTask(id));
    }
    catch(err) {
      console.log("error!: ", err);
      dispatch(failedOneTask(id, err, 'deleteTask'));
    }
  }

  async function completeTask(id, status, description) {
    try {
      const response  = await fetch (`/api/task/edit/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newStatus: `${status}`,
          newDescription: `${description}`,

        })
      });
      await response.json();
      dispatch(completeDispatchTask(id, status));
    }
    catch(err) {
      console.log("error!: ", err);
      dispatch(failedOneTask(id, err, 'competeTask'));
    }
  }

  function editTask(id) {
    dispatch(editDispatchTask(id));
  }

  //for SAGA
  function saveTask(id, newTitle, newDescription) {
    dispatch(callSaveTask(id, newTitle, newDescription));
  }

  return (
    <>
      {loading && <Loading />}
      {error && error.message}
  
      <section className="hero is-light hero is-small">
        <div className="hero-body">
          <div className="container">
            <h3 className="title has-text-centered">
              Tasks
            </h3>
            <h5 className="subtitle has-text-centered">
              {viewMode}
            </h5>
          </div>
        </div>
      </section>

      <section className="is-light">
        <div className="columns is-multiline">
          { tasks && tasks
                .filter((task) => (viewMode === 'all' || task.status === viewStatus))
                .map(( task) => < TaskItem key={task._id} title={task.title} status={task.status} _id={task._id}  description={task.description} funcDelete={deleteTask} completeTask={completeTask} editTask={editTask} editFlg={task.editFlg} saveTask={saveTask} />)
          }
        </div>
      </section>

    </>
  )
}

export default TaskList;
