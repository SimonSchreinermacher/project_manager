import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home.js'
import CreateProject from './components/CreateProject.js'
import Project from './components/Project.js'
import CreateTodo from './components/CreateTodo.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/create" component={CreateProject}></Route>
          <Route exact path="/project/:id" component={Project}></Route>
          <Route path="/project/:id/newtask" component={CreateTodo}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
