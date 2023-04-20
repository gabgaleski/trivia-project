import { ADD_SCORE, CORRECT_ANSWERS } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

export const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + payload,
    };
  case CORRECT_ANSWERS:
    return {
      ...state,
      assertions: state.assertions + payload,
    };
  default:
    return state;
  }
};
