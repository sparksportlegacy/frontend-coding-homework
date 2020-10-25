import {
  fetchMoviesPending,
  fetchMoviesSuccess,
  fetchMoviesError,
} from "./index";
import { API } from "../constants/api";

function fetchMovies(criteria) {
  console.log("inside fetch movies");
  return (dispatch) => {
    dispatch(fetchMoviesPending());
    return fetch(
      `${API}/search/movie?api_key=${process.env.MOVIE_DATABASE_API_KEY}&query=${criteria}&language=en-US&page=1&include_adult=false`
    )
      .then((res) =>
        res.ok ? res.json() : Promise.reject({ err: res.status })
      )
      .then((json) => {
        console.log(json);
        dispatch(fetchMoviesSuccess(json));
      })
      .catch((error) => {
        const errMessage = error.err ? error.err : error.message;
        dispatch(fetchMoviesError(errMessage));
      });
  };
}

export default fetchMovies;
