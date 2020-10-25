import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMovies from "./fetchMovies";
import { types } from "./types";
import fetchMock from "fetch-mock";
import expect from "expect";
import { API } from "../constants/api";
import { movieData } from "../fixtures/movieData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const criteria = "test";

  it("creates FETCH_MOVIES_SUCCESS when fetching movies has been done", () => {
    fetchMock.getOnce(
      `${API}/search/movie?api_key=${process.env.MOVIE_DATABASE_API_KEY}&query=${criteria}&language=en-US&page=1&include_adult=false`,
      {
        movies: movieData,
      }
    );

    const expectedActions = [
      { type: types.FETCH_MOVIES_PENDING },
      {
        type: types.FETCH_MOVIES_SUCCESS,
        movies: { movies: movieData },
      },
    ];
    const store = mockStore({ movies: [] });
    console.log(store.getState());

    return store.dispatch(fetchMovies(criteria)).then(() => {
      // return of async actions
      console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
