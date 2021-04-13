import "./App.css";
import React from "react";
import Navigation from "./components/Navigation.js";
import Home from "./components/Home.js";
import Home1 from "./components/Home1.js";
import Home2 from "./components/Home2.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/1" component={Home1} />
          <Route exact path="/2" component={Home2} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
