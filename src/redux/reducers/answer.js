import {
  FETCH_ANSWERS,
  FETCH_COUNTERS,
  FETCH_HISTORY,
  SET_LOADING,
} from '../types';

const initialState = {
  answers: [],
  counters: [],
  history: [],
  isLoading: false,
};

export const answerReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_ANSWERS:
      return {
        ...state,
        answers: payload,
      };

    case FETCH_COUNTERS:
      return {
        ...state,
        counters: payload,
      };

    case FETCH_HISTORY:
      return {
        ...state,
        history: payload,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
};

export default answerReducer;
