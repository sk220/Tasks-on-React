import {ADD_TASK, ADD_ONETASK, DELETE_TASK, EDIT_TASK , COMPLETE_TASK, SAVE_TASK , FAILED_TASK , FAILED_ONETASK} from '../actions/action-types';

export default (state=[], action) => {  // reducer

  switch (action.type) {
    case ADD_TASK:
      const arr = [...state];
      action.payload.forEach( (task) => arr.push({ _id: task._id,title: task.title, status: task.status, description: task.description}) );
      return arr;

    case ADD_ONETASK:
      const {_id, title, status, description} = action.payload;
      return [...state, 
        {_id, title, status, description }];

    case FAILED_ONETASK:
      return [ ...state, 
        {
          _id: action.id,
          type: 'FAILED',
          errorMessage: action.err,
          errorFlg: true,
          step: action.step,
        }
      ];

    case DELETE_TASK:
      return state.filter( (task) =>  task._id !== action.id);

    case EDIT_TASK:
      return ( state.map( (task) => {
          if (task._id === action.id) {
            return {
              ...task,
              editFlg: !task.editFlg,
            }
          } 
          else return task;
        }));

    case SAVE_TASK:
      return ( state.map( (task) => {
          if (task._id === action.id) {
              return {
                ...task,
                title: action.title,
                description: action.description,
                editFlg: !task.editFlg,
              }
            } 
          else return task;
            }));

        
    case COMPLETE_TASK:
      return ( state.map( (task) => {
          if (task._id === action.id) {
            return {
              ...task,
              status: action.status,
            }
          } 
          return task;
        }));





// обработка ошибки для action:  DELETE_TASK, EDIT_TASK, SAVE_TASK,  COMPLETE_TASK по id таска
      case FAILED_TASK:
        return ( state.map( (task) => {
          if (task._id === action.id) {
            return {
              ...task,
              errorFlg: true,
              errorStep: action.step,
              errorMessage: action.err,
            }
          } 
          else return task;
        }));
  

    default:
      return state;
  }
};



