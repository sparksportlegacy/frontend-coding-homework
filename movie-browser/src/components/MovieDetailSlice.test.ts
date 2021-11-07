import { configureStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { generateMovieDetailsUrl, Movie } from '../api/client'
import reducer, { fetchMovie, Status, MovieDetailState } from './movieDetailSlice'

jest.mock('../constants.ts', () => {
    return {
        'API_KEY': 'test_api_key'
    }
})

test('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual(
        {
            movie: null,
            mainStatus: Status.loading,
            error: null,
        } as MovieDetailState
    )
})

test('should be done when page load is complete', async () => {
    const store = configureStore({
        reducer: {
            movieDetail: reducer
        }
    })

    const networkSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce(new Response(JSON.stringify({
        id: 'string',
        title: 'string',
        vote_average: 1,
        vote_count: 1,
        overview: 'string',
        release_date: 'string',
        poster_path: 'string'
    } as Movie)))

    await store.dispatch(fetchMovie('test'))

    expect(networkSpy).toBeCalledWith(generateMovieDetailsUrl('test_api_key', 'test'));
    expect(store.getState().movieDetail.mainStatus).toBe(Status.done)
})

test('should be loading when data is pending', async () => {
    const store = configureStore({
        reducer: {
            movieDetail: reducer
        }
    })

    const networkSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => new Promise(() => {
        return;
    }))

    store.dispatch(fetchMovie('test'))

    expect(networkSpy).toBeCalledWith(generateMovieDetailsUrl('test_api_key', 'test'));
    expect(store.getState().movieDetail.mainStatus).toBe(Status.loading)
})
