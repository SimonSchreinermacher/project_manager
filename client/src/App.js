import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
