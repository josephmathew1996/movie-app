import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import isLoggedIn from '../HOC/isLoggedIn';
import Routing from '../Routing';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  render() {
    return (
      <Switch>
        <Route path="/login" component={isLoggedIn(Login, "/login")} />
        <Route path="*" component={isLoggedIn(Routing)} />
      </Switch>
    );
  }
}
export default App;
