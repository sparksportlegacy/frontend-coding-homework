import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { generateSearchUrl, Movie, SearchResult } from '../api/client';
import { API_KEY } from '../constants';

type HomepageState = {
  results: Movie[],
  status: Status,
  error: string | undefined | null
}

export enum Status {
  idle,
  loading,
}

const initialState: HomepageState = {
  results: [],
  status: Status.idle,
  error: null,
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (searchTerm: string) => {
  if (searchTerm === '') return []

  const response = await fetch(generateSearchUrl(API_KEY, searchTerm))
  const results = (await response.json()) as SearchResult

  return results.results.slice(0, 5)
})

export const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = Status.loading
        state.error = ''
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = Status.idle
        state.results = action.payload
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = Status.idle
        state.error = action.error.message
      })
  },
})

export default homepageSlice.reducer

export const selectMovieResults = (state: HomepageState) => state.results