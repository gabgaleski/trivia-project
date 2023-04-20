export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_SCORE = 'ADD_SCORE';
export const CORRECT_ANSWERS = 'CORRECT_ANSWERS';

export const addEmail = (payload) => ({
  type: ADD_LOGIN,
  payload,
});
export const scoreDispatch = (payload) => ({
  type: ADD_SCORE,
  payload,
});
export const correctDispatch = (payload) => ({
  type: CORRECT_ANSWERS,
  payload,
});
