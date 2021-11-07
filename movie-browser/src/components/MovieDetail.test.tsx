import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ReactDOM from 'react-dom';
import { MovieDetail } from './MovieDetail';
import Router from 'react-router-dom';
import { generateMovieDetailsUrl, Movie } from '../api/client';
import { API_KEY } from '../constants';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

jest.mock('../constants.ts', () => {
    return {
        'API_KEY': 'test_api_key'
    }
})

test('renders', () => {

    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1234' })

    jest.spyOn(global, 'fetch').mockResolvedValueOnce(new Response(JSON.stringify({
        id: '1234',
        title: 'string',
        vote_average: 1,
        vote_count: 1,
        overview: 'string',
        release_date: 'string',
        poster_path: 'string'
    } as Movie)))

    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <MovieDetail />
        </ Provider>,
        div);
    
    expect(fetch).toBeCalledWith(generateMovieDetailsUrl(API_KEY, '1234'))
});
