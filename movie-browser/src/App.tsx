import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import { Homepage } from './components/Homepage';
import { MovieDetail } from './components/MovieDetail';

function App() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    }}
    >
      <Router>
        <Switch>
          <Route path="/movie/:id">
            <MovieDetail />
          </Route>
          <Route path="/movie">
            <Redirect to="/" />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
