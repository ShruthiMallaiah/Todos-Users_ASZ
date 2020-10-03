import * as actionTypes from '../actions/actionTypes';

const intialState = {
    todos: []
};

const storageHandler = (data) => {
    localStorage.setItem("todos", JSON.stringify(data));
}

const todosReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.EDIT_TODO:
            storageHandler(action.todos);
            return {
                ...state,
                todos: action.todos
            };
        case actionTypes.DELETE_TODO:
            storageHandler(state.todos.filter(todo => todo.key !== action.key));
            return {
                ...state,
                todos: state.todos.filter(todo => todo.key !== action.key)
            };
        case actionTypes.GET_TODOS:
            return {
                ...state,
                todos: state.todos.concat(action.todos)
            };
        case actionTypes.ADD_TODO:
            storageHandler([
                ...state.todos,
                { ...action.todo, key: state.todos.length }
            ]);
            return {
                ...state,
                todos: [...state.todos, { ...action.todo, key: state.todos.length }]
            };
        default: return state
    }
}

export default todosReducer;
