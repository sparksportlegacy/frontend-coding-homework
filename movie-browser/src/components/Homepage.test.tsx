import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Homepage } from './Homepage'

test('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <Homepage />
        </ Provider>,
        div);
});