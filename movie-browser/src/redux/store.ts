import { configureStore } from '@reduxjs/toolkit'
import homepageSliceReducer from '../components/homepageSlice'
import MovieDetailSliceReducer from '../components/movieDetailSlice'

export const store = configureStore({
  reducer: {
    homepage: homepageSliceReducer,
    movieDetail: MovieDetailSliceReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch