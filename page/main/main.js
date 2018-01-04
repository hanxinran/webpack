import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Login from '../login/login';

const RouterMap = () => {
  return(
    <Router>
        <Switch>
          <Route exact path="/" component={ Login }></Route>
        </Switch>
    </Router>
  )
}

//export default RouterMap



