import { ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

export const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + payload,
    };
  default:
    return state;
  }
};
