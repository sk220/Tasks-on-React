import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import taskReducer from './reducers/tasks';
import loadingReducer from './reducers/loading';
import tasks from './reducers/tasks';
// thunk 
import reduxThunk from 'redux-thunk';

//для SAGA
import reduxSaga from 'redux-saga';
import { all } from 'redux-saga/effects'
import taskSaga from './taskSaga';
// import { all } from 'bluebird';

const  sagaMiddleware = reduxSaga();
// end SAGA


// let i = 0;
// export function getId() {
//   i += 1;
//   return i;
// }

// формат state: 
// const initial = {
//   tasks: [
//           {
//             id: 1,
//             title: 'Learn React',
//             status: false,
//             editFlg: false,
//           },
//           {
//             id: 2,
//             title: 'Drink Coffee',
//             status: false,
//             editFlg: false,
//           },
//         ],
    // loadingStatus: {
    //   loading: false, 
    //   error:  false, , 
    //   errorMessage: null , 
    // }
// }

// const localStorageState = window.localStorage.getItem('state');
// const initialState =  localStorageState ? JSON.parse(localStorageState) : undefined ; // чтобы брать инфу из локалсторадж всегда 

const initialState = undefined;

const store = createStore(
  combineReducers({
    tasks : taskReducer, // можно добавлять разные редюсеры
    loadStatus: loadingReducer,
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
  window.localStorage.setItem('state', JSON.stringify(state));  // добавление в локалсторадже из стора чтбы после пеерезагрузки страницы ничего не пропалалдло 
  // (дальше вытягиваем инфу уже из локал стора) 
})

export default store;
