/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

function TaskItem({ title, id, status, funcDelete, completeTask, editTask, editFlg, saveTask }) {
  
  const [newTitle, setNewTitle] = useState(title);

  function inputTitleChanged(event) {
    setNewTitle(event.target.value);
  }

  function deleteTask() {
    funcDelete(id);
  }

  function checkTask() {
    completeTask(id);
  }

  function editTaskForm() {
    editTask(id);
  }

  function saveTaskForm(event) {
    event.preventDefault();
    saveTask(id, newTitle);
  }

  return (
    <>
      <from>
        <ul >
          <input type="checkbox" onClick={checkTask}/>
          {editFlg &&
            <form name="editTitleForm" onSubmit={saveTaskForm}>
              <label htmlFor="editTitle">
                Введите новое название задачи:
                <input
                  onChange={inputTitleChanged}
                  name="editTitle"
                  type="text"
                  value={newTitle}
                />
              </label>
              <button type="submit">Сохранить</button>
            </form>
          }
          {status && <div style={{ "textDecoration": "line-through" }} > Название: <strong>{title} </strong>, id: {id} </div>}
          {!status && <div style={{ "textDecoration": "none" }} > Название: <strong>{title} </strong>, id: {id} </div>}

          <button type="button" onClick={deleteTask}>Удалить</button>
          <button type="button" onClick={editTaskForm}>Редактировать</button>
        </ul>
      </from>
    </>
  )
}

export default TaskItem;
