import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../Authentication/Login/Login';
import Register from '../Authentication/Register/Register';
import Organization from '../Organization/Organization';

const App = () => {
  const token = useSelector(state => state.auth.sessionID);
  let route = (
    <Switch>
      <Route path="/user/login" component={Login} />
      <Route path="/user/register" component={Register} />
      <Redirect from="/" to="/user/login" />
    </Switch>
  );
  if (token){
    route = (
      <Switch>
        <Route path="/organization" component={Organization} />
        <Redirect from="/" to="/organization" />
      </Switch>
    );
  }

  return route;
}

export default App;
