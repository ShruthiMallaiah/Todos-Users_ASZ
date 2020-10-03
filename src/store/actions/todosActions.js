import * as actionTypes from './actionTypes';

export const getTodos = data => (
    {
        type: actionTypes.GET_TODOS,
        todos: data || []
    }
);

export const addTodo = data => (
    {
        type: actionTypes.ADD_TODO,
        todo: data
    }
);

export const editTodo = (data) => (
    {
        type: actionTypes.EDIT_TODO,
        todos: data
    }
);


export const deleteTodo = delKey => (
    {
        type: actionTypes.DELETE_TODO,
        key: delKey
    }
);
