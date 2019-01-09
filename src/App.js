import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Notifications from "react-notify-toast";
import "tabler-react/dist/Tabler.css";
import Login from './containers/Login';
import Register from './containers/Register';
import Dashboard from './containers/Dashboard';
import Movie from './containers/Movie';
import Series from './containers/Series';
import Seasons from './containers/Seasons';
import Episode from './containers/Episode';

const App = () => {
  return (
    <div className="app">
      <Notifications />
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/movie/:id" component={Movie}></Route>
        <Route exact path="/series/:id" component={Series}></Route>
        <Route exact path="/series/:id/seasons/:s_id" component={Seasons}></Route>
        <Route exact path="/series/:id/seasons/:s_id/episodes/:e_id" component={Episode}></Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
