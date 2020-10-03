import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import usersReducer from './usersReducer';
import { RESET_REDUX } from '../actions/actionTypes';

const appReducer = combineReducers({
    todos: todosReducer,
    users: usersReducer
});

const rootReducer = (state, action) => {
    if (action.type === RESET_REDUX) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;