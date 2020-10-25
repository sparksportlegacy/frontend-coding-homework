import movieReducer from "./movieReducer";
import { types } from "../actions/types";

const initialState = {
  pending: false,
  movies: [],
  error: null,
};
describe("Movie Reducer", () => {
  it("Should return initial state", () => {
    const newState = movieReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it("Should handle FETCH_MOVIES_PENDING", () => {
    const newState = movieReducer(initialState, {
      type: types.FETCH_MOVIES_PENDING,
    });
    expect(newState).toEqual({ ...initialState, pending: true });
  });

  it("Should handle FETCH_MOVIES_SUCCESS", () => {
    const moviesSuccess = {
      page: 1,
      results: [
        {
          id: 77707,
          title: "Test movie",
          adult: false,
          poster_path: null,
        },
      ],
      totalPages: 1,
      totalResults: 1,
    };
    const newState = movieReducer(
      { ...initialState, pending: true },
      {
        type: types.FETCH_MOVIES_SUCCESS,
        movies: moviesSuccess,
      }
    );
    console.log(newState);
    expect(newState).toEqual({
      ...initialState,
      pending: false,
      movies: moviesSuccess,
    });
  });

  it("Should handle FETCH_MOVIES_ERROR", () => {
    const error = {
      message: "404 not found",
    };

    const newState = movieReducer(
      { ...initialState, pending: true },
      {
        type: types.FETCH_MOVIES_ERROR,
        error: error,
      }
    );
    expect(newState).toEqual({ ...initialState, pending: false, error });
  });
});
