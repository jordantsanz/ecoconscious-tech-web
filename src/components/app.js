import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Test from './test';

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Test} />
      </Switch>
    </Router>
  );
};

export default App;
