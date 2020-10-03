import * as actionTypes from '../actions/actionTypes';

const intialState = {
    users: []
};

const storageHandler = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
}

const usersReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.EDIT_USER:
            storageHandler(action.users);
            return {
                ...state,
                users: action.users
            };
        case actionTypes.DELETE_USER:
            storageHandler(state.users.filter(user => user.key !== action.key));
            return {
                ...state,
                users: state.users.filter(user => user.key !== action.key)
            };
        case actionTypes.GET_USERS:
            return {
                ...state,
                users: state.users.concat(action.users)
            };
        case actionTypes.ADD_USER:
            storageHandler([
                ...state.users,
                { ...action.user, key: state.users.length }
            ]);
            return {
                ...state,
                users: [...state.users, { ...action.user, key: state.users.length }]
            };
        default: return state
    }
}

export default usersReducer;