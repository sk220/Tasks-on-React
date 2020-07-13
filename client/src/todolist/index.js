import React, { useState, useEffect } from 'react';
import TaskItem from '../TaskItem';
import { useSelector, useDispatch } from 'react-redux';
import { addDispatchTask, editDispatchTask, deleteDispatchTask, completeDispatchTask, saveDispatchTask} from '../redux/actions/tasks'; 
import { loadingStarted, loadingFailed, loadingSuccessful } from '../redux/actions/loading';
import Loading from '../Loading'

// let i = 0;
// function getId() {
//   i += 1;
//   return i;
// }

function Todolist() {

  const dispatch = useDispatch();


  const [taskName, setTaskName] = useState(''); // для добавления новой задачи

  const task = useSelector((state) => state.tasks);
  const error = useSelector((state) => state.loadStatus.error);
  const loading = useSelector((state) => state.loadStatus.loading);


  useEffect(() => {
    (async () => {
      dispatch(loadingStarted());
      try {
        const response = await fetch('/api/data');
        const json = await response.json();
        dispatch(addDispatchTask(json));
        dispatch(loadingSuccessful());
      } catch (err) {
        dispatch(loadingFailed(err));
      }
    })();
  }, [dispatch]);



  function addTask(event) {
    event.preventDefault();
    dispatch(addDispatchTask(taskName));
    setTaskName('');
  }

  function inputChanged(event) {
    setTaskName(event.target.value);
  }


  function deleteTask(id) {
    dispatch(deleteDispatchTask(id));
  }

  function completeTask(id) {
    dispatch(completeDispatchTask(id));
  }

  function editTask(id) {
    dispatch(editDispatchTask(id)); 

  }

  function saveTask(id, newTitle) {
    dispatch(saveDispatchTask(id, newTitle));
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
      { task && task.map((task) => <TaskItem key={task.id} title={task.title} status={task.status} id={task.id} funcDelete={deleteTask} completeTask={completeTask} editTask={editTask} editFlg={task.editFlg} saveTask={saveTask} />)}
    </>
  )
}

export default Todolist;
