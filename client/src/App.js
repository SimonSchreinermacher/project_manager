import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProjectList from './components/ProjectList/ProjectList.js'
import CreateProject from './components/CreateProject/CreateProject.js'
import Project from './components/Project/Project.js'
import Login from './components/Authentication/Login.js';
import Register from './components/Authentication/Register.js';
import Navbar from './components/Navbar/Navbar.js';
//import CreateTodo from './components/CreateTodo.js'
import './App.css';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
//<Route path="/" component = {Navbar}></Route>
function App(){
  return(
    <div class="app">
      <Router>
        <Route path="/" component = {Navbar}></Route>
        <div class="body">
          <div class="left">
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/" component= {ProjectList}></Route>
            </Switch>
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
