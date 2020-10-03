import * as actionTypes from './actionTypes';

export const getUsers = data => (
    {
        type: actionTypes.GET_USERS,
        users: data || []
    }
);

export const addUser = data => (
    {
        type: actionTypes.ADD_USER,
        user: data
    }
);

export const editUser = (data) => (
    {
        type: actionTypes.EDIT_USER,
        users: data
    }
)


export const deleteUser = delKey => (
    {
        type: actionTypes.DELETE_USER,
        key: delKey
    }
);
