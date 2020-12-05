import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import StoryPage from './StoryPage';
import StatsPage from './StatsPage';
import ToolsPage from './ToolsPage';
import HackDukePage from './HackDukePage';

const App = (props) => {
  return (
    <Router>
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="fade"
          >
            <Switch location={location}>
              <Route exact path="/" component={StoryPage} />
              <Route path="/stats" component={StatsPage} />
              <Route path="/tools" component={ToolsPage} />
              <Route path="/hackduke" component={HackDukePage} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    </Router>
  );
};

export default App;
