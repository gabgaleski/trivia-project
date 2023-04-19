import { combineReducers } from 'redux';
import { ADD_LOGIN } from '../actions';

const INITIAL_STATE = {
  login: { name: '', email: '' },
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_LOGIN:
    return {
      ...state,
      login: { ...payload },
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ reducer });

export default rootReducer;
