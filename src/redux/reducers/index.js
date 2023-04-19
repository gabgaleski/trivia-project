import { combineReducers } from 'redux';

const INITIAL_STATE = {};

const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ Reducer });

export default rootReducer;
