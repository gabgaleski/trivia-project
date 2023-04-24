import { ADD_SCORE, CORRECT_ANSWERS, RANKING_SAVE } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
  rank: [],
};

export const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_SCORE:
    return {
      ...state,
      score: payload === 0 ? 0 : state.score + payload,
    };
  case CORRECT_ANSWERS:
    return {
      ...state,
      assertions: payload === 0 ? 0 : state.assertions + payload,
    };
  case RANKING_SAVE:
    return {
      ...state,
      rank: [...state.rank, payload],
    };
  default:
    return state;
  }
};
