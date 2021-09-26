import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProjectList from './components/ProjectList.js'
import CreateProject from './components/CreateProject.js'
import Project from './components/Project.js'
//import CreateTodo from './components/CreateTodo.js'
import './App.css';
import './components/styles.css';

/*function App() {
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
}*/

function App(){
  return(
    <div>
      <Router>
      <div class="body">
          <div class="left">
              <Route path="/" component= {ProjectList}></Route>
          </div>
          
          <div class="right">
            <Switch>
              <Route path="/create" component={CreateProject}></Route>
              <Route path="/project/:id" component={Project}></Route>
            </Switch>
          </div>
      </div>
      </Router>
    </div>
);
}

export default App;
