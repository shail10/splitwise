import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Login, Home, Register, Dashboard, AddExpenses, Profile, YourExpenses, ChartContainer, Practice } from './components';

import './App.css';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/add-expenses" component={AddExpenses} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/your-expenses" component={YourExpenses} />
        <Route exact path="/analytics" component={ChartContainer} />
        <Route exact path="/practice" component={Practice} />
      </Switch>
    </>
    // </Router>
  );
}

export default App;
