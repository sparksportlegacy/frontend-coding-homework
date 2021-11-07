import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateMovieDetailsUrl, Movie } from '../api/client';
import { API_KEY } from '../constants';

export enum Status {
  loading,
  done,
}

export type MovieDetailState = {
  movie: Movie | null,
  mainStatus: Status,
  error: string | undefined | null
}

const initialState: MovieDetailState = {
  movie: null,
  mainStatus: Status.loading,
  error: null,
};

export const fetchMovie = createAsyncThunk('movies/fetchMovie', async (movieId: string) => {
  if (movieId === '') return null;

  const response = await fetch(generateMovieDetailsUrl(API_KEY, movieId));
  const results = (await response.json()) as Movie;

  return results;
});

export const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.mainStatus = Status.loading;
        state.error = '';
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.mainStatus = Status.done;
        state.movie = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.mainStatus = Status.done;
        state.error = action.error.message;
      });
  },
});

export default movieDetailSlice.reducer;
