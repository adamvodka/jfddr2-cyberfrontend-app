import './index-reset.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectView from './views/ProjectView/ProjectView';
import TableView from './views/TableView/TableView';
import Nav from './views/Nav/Nav';
import LoginButton from './views/LandingPage/LandingPage'

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/project">
          <ProjectView />
        </Route>
        <Route path="/table">
          <TableView />
        </Route>
        <Route path="/">
          <LoginButton />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;