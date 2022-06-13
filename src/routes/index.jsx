import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <Register exact path="/register"/>
      </Route>
      <Route>
        <Login exact path="/login"/>
      </Route>
    </Switch>
  );
}

export default Routes;
