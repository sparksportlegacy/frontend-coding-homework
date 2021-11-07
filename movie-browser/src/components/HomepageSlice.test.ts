import { configureStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { generateSearchUrl, Movie, SearchResult } from '../api/client'
import reducer, { fetchMovies, Status } from './homepageSlice'

jest.mock('../constants.ts', () => {
    return {
        'API_KEY': 'test_api_key'
    }
})

test('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual(
        {
            results: [],
            status: Status.idle,
            error: null,
        }
    )
})

test('should be idle when a search is complete', async () => {
    const store = configureStore({
        reducer: {
            homepage: reducer
        }
    })

    const networkSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce(new Response(JSON.stringify({
        page: 1,
        results: [{
            id: 'string',
            title: 'string',
            vote_average: 1,
            vote_count: 1,
            overview: 'string',
            release_date: 'string',
            poster_path: 'string'
        } as Movie],
        total_pages: 5,
        total_results: 50
    } as SearchResult)))

    await store.dispatch(fetchMovies('test'))

    expect(networkSpy).toBeCalledWith(generateSearchUrl('test_api_key', 'test'));
    expect(store.getState().homepage.status).toBe(Status.idle)
})

test('should be loading when a search is pending', async () => {
    const store = configureStore({
        reducer: {
            homepage: reducer
        }
    })

    const networkSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => new Promise((resolve, reject) => {
        return;
    }))

    store.dispatch(fetchMovies('test'))

    expect(networkSpy).toBeCalledWith(generateSearchUrl('test_api_key', 'test'));
    expect(store.getState().homepage.status).toBe(Status.loading)
})
