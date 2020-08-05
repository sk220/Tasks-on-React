import React, { useState } from 'react';

function TaskItem({ title, _id, status, description, funcDelete, completeTask, editTask, editFlg, saveTask }) {
  
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);


  function inputTitleChanged(event) {
    setNewTitle(event.target.value);
  }

  function inputChangedDescription(event) {
    setNewDescription(event.target.value);
  }

  function deleteTask() {
    funcDelete(_id);
  }

  function checkTask() {
    let newStatus;
    if (status ==='finished') {
      newStatus = 'open';
    }
    else if (status ==='open') {
      newStatus = 'finished';
    }
    completeTask(_id, newStatus);
  }

  function editTaskForm() {
    editTask(_id);
  }

  function saveTaskForm(event) {
    event.preventDefault();
    saveTask(_id, newTitle, newDescription);
  }

  return (
    <>
      {/* <section className="section columns" > */}
      
        <div className="column is-one-fifth">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
              {title}
              </p>

              <a href="#" className="card-header-icon" onClick={checkTask} aria-label="more options">
                { (status === 'finished') && 
                <>
                  <span className="icon has-text-success">
                    <i className="fas fa-check-double " aria-hidden="true"></i>
                  </span> 
                  <span className="help has-text-success">Done!</span>
                </>
                }
                { (status === 'open') && 
                <span className="help">Mark as Done!</span>
                }
              </a>
            </header>
            <div className="card-content">
              <div className="content">
                  {description}
                <br></br>
                {/* <time datetime="2016-1-1">Finish until: 11:09 PM - 1 Jan 2016</time> */}
              </div>
            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item" onClick={editTaskForm}>Edit</a>
              <a href="#" className="card-footer-item" onClick={deleteTask}>Delete</a>
            </footer>
          </div>
        </div>


          { editFlg &&
            <div className="modal is-active">
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title has-text-centered">Edit task</p>
                  <button className="delete" aria-label="close" onClick={editTaskForm}></button>
                </header>
                <section className="modal-card-body">
                  <div>    
                      <div className="field">
                        <div className="control">
                          <label htmlFor="editTitle">
                            Title:
                            <input
                              className ="input is-warning"
                              onChange={inputTitleChanged}
                              name="editTitle"
                              type="text"
                              required
                              value={newTitle}
                            />
                          </label>
                        </div>

                          <div className="control">
                            <label htmlFor="editDescription">
                              Description:
                              <input
                                  className ="input is-warning"
                                  onChange={inputChangedDescription}
                                  id="task"
                                  name="task"
                                  type="text"
                                  required
                                  value={newDescription}
                                />
                            </label>
                          </div>

                          <div className="field is-grouped">
                            <div className="control">
                              <a className="button is-primary" type="submit" onClick={saveTaskForm}>
                                Save
                              </a>
                            </div>
                          </div>

                      </div>
                  </div>
                </section>
              </div>
            </div>
          }
      {/* </section> */}
    </>
  )
}

export default TaskItem;
