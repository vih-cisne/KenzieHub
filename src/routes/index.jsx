import { useEffect } from "react";
import { useState } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Routes() {

  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {

    const token = JSON.parse(localStorage.getItem("@KenzieHub:token"))

    if(token) {
      setAuthenticated(true)
    }

  }, [authenticated])
  return (
    <Switch>
      <Route exact path="/home">
        <Home authenticated={authenticated} setAuthenticated={setAuthenticated}/>
      </Route>
      <Route exact path="/register">
        <Register authenticated={authenticated} setAuthenticated={setAuthenticated}/>
      </Route>
      <Route exact path="/">
        <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
    </Switch>
  );
}

export default Routes;
