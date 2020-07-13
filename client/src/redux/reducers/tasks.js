import {ADD_TASK, ADD_ONETASK, DELETE_TASK, EDIT_TASK , COMPLETE_TASK, SAVE_TASK} from '../actions/action-types';


let i = 2;
export function getId() {
  i += 1;
  return i;
}

export default (state=[], action) => {  // reducer
  switch (action.type) {

    case ADD_TASK:
      const arr = [...state];
      action.payload.forEach( (task) => arr.push(task) );
      return arr;
        //  { 
        //     title: action.title,
        //     id: getId(),
        //     status: false,
        //     editFlg: false,
        //   }
        ;

    case ADD_ONETASK:
    return [...state,
            { 
                id: getId(),
                title: action.title,
                status: false,
                editFlg: false,
              }
          ];

    case DELETE_TASK:
      return state.filter( (task) =>  task.id !== action.id);

    case EDIT_TASK:
      return ( state.map( (task) => {
          if (task.id === action.id) {
            return {
              ...task,
              editFlg: !task.editFlg,
            }
          } 
          else return task;
        }));

    case SAVE_TASK:
      return ( state.map( (task) => {
          if (task.id === action.id) {
              return {
                ...task,
                title: action.title,
                editFlg: !task.editFlg,
              }
            } 
          else return task;
            }));

        
    case COMPLETE_TASK:
      return ( state.map( (task) => {
          if (task.id === action.id) {
            return {
              ...task,
              status: !task.status,
            }
          } 
          return task;
        }));

    default:
      return state;
  }
};



