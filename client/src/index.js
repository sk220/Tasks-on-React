import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
// import {addTask, deleteTask, editTask, } from './redux/actions/tasks';

// store.dispatch(addTask('Погулять с собакой'));
// store.dispatch(deleteTask(3));
// store.dispatch(addTask('Погулять с собакой'));
// store.dispatch(editTask('Погулять', 4)); 


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
