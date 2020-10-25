import React from "react";
import Search from "./views/Search/index";
import Detail from "./views/Detail/index";

import "./styles/styles.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SiteHeading } from "./constants/messages";

function App() {
  return (
    <Router>
      <div data-test="appComponent" className="app">
        <Switch>
          <Route path="/" exact component={Search} />
          <Route
            path="/movies/:movieId/detail"
            render={(props) => {
              return <Detail {...props}></Detail>;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
