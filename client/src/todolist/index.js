import React, { useState, useEffect } from 'react';
import TaskItem from '../TaskItem';
import { useSelector, useDispatch } from 'react-redux';
import { addDispatchTask, addDispatchOneTask, editDispatchTask, deleteDispatchTask, completeDispatchTask, saveDispatchTask ,failedOneTask,load ,add } from '../redux/actions/tasks'; 
import { loadingStarted, loadingFailed, loadingSuccessful } from '../redux/actions/loading';
import Loading from '../Loading'

function Todolist() {

  const dispatch = useDispatch();


  const [taskName, setTaskName] = useState(''); // для добавления новой задачи

  const task = useSelector((state) => state.tasks);
  const error = useSelector((state) => state.loadStatus.error);
  const loading = useSelector((state) => state.loadStatus.loading);
  console.log(task);

  // без thunk
  // useEffect(() => {
  //   (async () => {
  //     dispatch(loadingStarted());
  //     try {
  //       const response = await fetch('/api/tasks');
  //       const json = await response.json();

  //       dispatch(addDispatchTask(json));
  //       dispatch(loadingSuccessful());
  //     } catch (err) {
  //       dispatch(loadingFailed(err, 'getTasks' , err.message));
  //     }
  //   })();
  // }, [dispatch]);

// на thunk
  useEffect(() => {
      dispatch(loadingStarted());
      dispatch(load());
  }, [dispatch]);

 // без thunk
  // async function addTask(event) {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch('/api/task', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify( {
  //         title: taskName,
  //       })
  //     });

  //     const json = await response.json();
  //     dispatch(addDispatchOneTask(json));
  //   } 
  //   catch (err) {
  //     // error: concat(err.status, ': ', err.message)
  //     dispatch(failedOneTask(err, 'addOneTask'));
  //   }
  //   setTaskName('');
  // }

  function addTask(event) {
    event.preventDefault();
    dispatch(add(taskName));
    setTaskName('');
  }

  function inputChanged(event) {
    setTaskName(event.target.value);
  }


  async function deleteTask(id) {
    try {
      debugger;
      const response  = await fetch (`/api/task/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json(); //? как отправить диспатч после получения результата или так ок?
      dispatch(deleteDispatchTask(id));
    }
    catch(err) {
      console.log("error!: ", err);
      dispatch(failedOneTask(id, err, 'deleteTask'));
    }

    dispatch(deleteDispatchTask(id));
  }

  async function completeTask(id, status) {
    console.log(id, status);

    try {
      const response  = await fetch (`/api/task/edit/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // currentTitle: task.title,
          newStatus: `${status}`,
        })
      });
      const json = await response.json(); //? как отправить диспатч после получения результата или так ок?
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


  async function saveTask(id, newTitle) {
    console.log(newTitle);
    try {
      const response  = await fetch (`/api/task/edit/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newTitle: `${newTitle}`,
        })
      });
      debugger;
      const json = await response.json(); //? как отправить диспатч после получения результата или так ок?
      dispatch(saveDispatchTask(id, newTitle));
    }
    catch(err) {
      console.log("error!: ", err);
      dispatch(failedOneTask(id, err, 'editTask'));
    }
  }

  return (
    <>
    {loading && <Loading />}
    {error && error.message}
      <h1>Список задач</h1>
      <form onSubmit={(event) => addTask(event)}>
        <label htmlFor="task">
          Наименование задачи:
          <input
            onChange={inputChanged}
            id="task"
            name="task"
            type="text"
            required
            value={taskName}
          />
        </label>
        <button type="submit">Добавить задачу</button>
      </form>
      { task && task.map((task) => <TaskItem key={task._id} title={task.title} status={task.status} _id={task._id} funcDelete={deleteTask} completeTask={completeTask} editTask={editTask} editFlg={task.editFlg} saveTask={saveTask} />)}
    </>
  )
}

export default Todolist;
