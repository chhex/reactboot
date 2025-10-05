import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ClientList from './ClientList';
import ClientEdit from './ClientEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/clients/:id" component={ClientEdit} />
          <Route path="/clients" exact component={ClientList} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    );
  }
}
export default App;

