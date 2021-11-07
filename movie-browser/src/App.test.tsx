import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import ReactDOM from 'react-dom';

test('renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(

    <Provider store={store}>
      <App />
    </ Provider>,
    div);
});
