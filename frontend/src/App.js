import "./App.css";
import { Header } from "./components";
import { Home, Login } from "./screens";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./fonts/Samim/Samim-Bold-FD-WOL.ttf";

export default () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
