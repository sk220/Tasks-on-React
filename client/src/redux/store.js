import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import taskReducer from './reducers/tasks';
import loadingReducer from './reducers/loading';
import settingsReducer from './reducers/settings';

import tasks from './reducers/tasks';

// thunk 
import reduxThunk from 'redux-thunk';

//для SAGA
import reduxSaga from 'redux-saga';
import { all } from 'redux-saga/effects'
import taskSaga from './taskSaga';

const  sagaMiddleware = reduxSaga();
// end SAGA

// формат state: 
// const initial = {
//   tasks: [
//           {
//             id: 1,
//             title: 'Learn React',
//             status: 'open',
//             description: '',
//             editFlg: false,
//           },
//           {
//             id: 2,
//             title: 'Drink Coffee',
//             status: 'open',
//             description: '',
//             editFlg: false,
//           },
//         ],
    // loadingStatus: {
    //   loading: false, 
    //   error:  false, , 
    //   errorMessage: null , 
    // }
    // setings: {
    //   viewMode: null, 
    //   viewStatus: null,
    // }
// }

// const localStorageState = window.localStorage.getItem('state');
// const initialState =  localStorageState ? JSON.parse(localStorageState) : undefined ; // чтобы брать инфу из локалсторадж всегда 

// const initialState = undefined;
const initialState = { 
  settings: {
    viewMode: 'all',
  }
}

const store = createStore(
  combineReducers({
    tasks : taskReducer,
    loadStatus: loadingReducer,
    settings: settingsReducer,

  }),
  // taskReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(
      reduxThunk,  // <- Thunk
      sagaMiddleware, // <- SAGA
      ),
  ),
);

// run saga middleware  for listen  be listen all action and dispatch them
sagaMiddleware.run(
  function* () {
    yield all(
      [
        taskSaga()
      ]
    )
  }
);

store.subscribe( ()=> {
  const state = store.getState();
  window.localStorage.setItem('state', JSON.stringify(state));  
  // добавление в локалсторадже из стора чтбы после пеерезагрузки страницы ничего не пропалалдло 
  // (дальше вытягиваем инфу уже из локал стора) 
})

export default store;
