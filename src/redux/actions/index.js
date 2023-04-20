export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_SCORE = 'ADD_SCORE';

export const addEmail = (payload) => ({
  type: ADD_LOGIN,
  payload,
});
export const scoreDispatch = (payload) => ({
  type: ADD_SCORE,
  payload,
});
