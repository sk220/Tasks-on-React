import redux from 'redux';


// создаем store
const { createStore } = redux;

//счетчик для id
let i = 0;
function getId() {
  i += 1;
  return i;
}

// задача
const taskList = {
  task: {
    id: getId(),
    title: 'Learn React',
    status: false,
    editFlg: false,
  }
}

// инициализируем store
const store = createStore(
  (state, action) => {  // reducer
    switch (action.type) {
      case 'ADD_TASK':
        return {
          ...state,
          title: action.title,
        }
      case 'DELETE_TASK':
        return {...state, title: action.title}
      case 'EDIT_TASK':
        return {...state, title: action.title}
      default:
        return state;
    }
  },
  task //  актуальное состояние 
);

console.log('--->> initial', store.getState());

const actionAdd = {
  type: 'ADD_TASK',
  title: 'Погулять с собакой',
}

//доравить новую задачу
store.dispatch(actionAdd);

console.log('--->> after', store.getState());
