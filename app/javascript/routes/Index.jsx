import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Categories from "../components/Categories";
import Report from "../components/Report";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/categories" exact component={Categories} />
      <Route path="/report" exact component={Report} />
    </Switch>
  </Router>
);
