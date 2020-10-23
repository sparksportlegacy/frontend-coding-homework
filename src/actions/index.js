import { types } from "./types";

export function fetchMoviesPending() {
  return {
    type: types.FETCH_MOVIES_PENDING,
  };
}

export function fetchMoviesSuccess(json) {
  return {
    type: types.FETCH_MOVIES_SUCCESS,
    movies: json,
  };
}

export function fetchMoviesError(error) {
  return {
    type: types.FETCH_MOVIES_ERROR,
    error: error,
  };
}
