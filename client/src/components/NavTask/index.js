import React, { useState} from 'react';
import AddingTask from '../AddingTask';
import { useDispatch } from 'react-redux';
import setViewMode from '../../redux/actions/settings';

function NavTask() {
  const dispatch = useDispatch();
  const [modalFlg, setModalFlg] = useState(false); // для показа модалки


  function setFlg() {
    setModalFlg(!modalFlg);
  }

  function showByStatus(mode) {
    const viewStatus = ( mode === 'finished' ? 'finished' : 'open');
    dispatch(setViewMode(mode, viewStatus));
  }

  return (
    <>
      <nav className="navbar is-dark is-spaced" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
              <span className="icon is-small has-text-warning" width="112" height="28"><i className="fas fa-list-ul" aria-hidden="true"></i></span>
              <div>
                <span className="has-text-warning">TASK LIST</span>
              </div>
          </a>
          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarEnd">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarEnd" className="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" onClick={setFlg}>
              New task
            </a>
          </div>

        { modalFlg &&
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title has-text-centered">New task</p>
                <button className="delete" aria-label="close" onClick={setFlg}></button>
              </header>
              <section className="modal-card-body">  
                  <AddingTask setFlg={setFlg} />
              </section>
            </div>
          </div>
        }

          <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">

                  <a className="button is-primary" href="#" aria-current="page" id="all_tasks" onClick={() => showByStatus('all')}>
                    <span className="icon is-small"><i className="fas fa-check-circle" aria-hidden="true"></i></span>
                    <span><strong>All Tasks</strong></span>
                  </a>

                  <a className="button is-warning" href="#" id="to_do" onClick={() => showByStatus('to do')}>
                    <span className="icon is-small"><i className="far fa-check-circle" aria-hidden="true"></i></span>
                    <span>To Do</span>
                  </a>

                  <a className="button is-danger" href="#" id="overdue" onClick={() => showByStatus('overdue')}>
                    <span className="icon is-small"><i className="far fa-check-circle" aria-hidden="true"></i></span>
                    <span>Overdue</span>
                  </a>

                  <a className="button is-success" href="#"  id="finished" onClick={() => showByStatus('finished')}>
                    <span className="icon is-small"><i className="fas fa-check-double" aria-hidden="true"></i></span>
                    <span>Finished</span>
                  </a>     

                </div>
              </div>
            </div>
        </div>

      </nav>
    </>
  )
}


export default NavTask;
