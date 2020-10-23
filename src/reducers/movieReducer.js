import { types } from "../actions/types";

const initialState = {
  pending: false,
  movies: [],
  error: null,
};
const movieReducer = (state= initialState, action) => {
  switch (action.type) {
    case types.FETCH_MOVIES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        pending: false,
        movies: action.movies,
      };
    case types.FETCH_MOVIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default movieReducer;