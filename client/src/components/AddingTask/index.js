import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../redux/actions/tasks'; 
import Loading from '../Loading';

//saga

function AddingTask({setFlg}) {

  const dispatch = useDispatch();

  const [taskName, setTaskName] = useState(''); // для добавления новой задачи
  const [taskDescription, setTaskDescription] = useState(''); // для добавления новой задачи

  const error = useSelector((state) => state.loadStatus.error);
  const loading = useSelector((state) => state.loadStatus.loading);

  function addTask(event) {
    event.preventDefault();
    dispatch(add(taskName, taskDescription));
    setTaskName('');
    setFlg();
  }

  function inputChangedTitle(event) {
    setTaskName(event.target.value);
  }
  
  function inputChangedDescription(event) {
    setTaskDescription(event.target.value);
  }


  return (
    <>
    {loading && <Loading />}
    {error && error.message}

          {/* <div className="field">
            <div className="control">
              <div className="select">
                <select>
                  <option>Type</option>
                  <option>Work</option>
                  <option>Home</option>
                  <option>Leasure</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div> */}

        <div className="field">

          <div className="control">
              <label htmlFor="taskTitle">
                Title:
                <input
                    className ="input is-warning"
                    onChange={inputChangedTitle}
                    id="taskTitle"
                    name="taskTitle"
                    type="text"
                    required
                    placeholder="Task name"
                    value={taskName}
                  />
              </label>
          </div>

          <div className="control">
              <label htmlFor="taskDesc">
                Description:
                <input
                    className ="input is-warning"
                    onChange={inputChangedDescription}
                    id="taskDesc"
                    name="taskDesc"
                    type="text"
                    required
                    placeholder="Task description"
                    value={taskDescription}
                  />
              </label>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <a className="button is-primary" type="submit" onClick={(event) => addTask(event)}>
                Add task
              </a>
            </div>
          </div>
        </div>
    </>
  )
}

export default AddingTask;
