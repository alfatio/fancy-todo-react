import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LandingPage from './components/LandingPage'
import MainPage from './components/MainPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={MainPage}/>
        <Route path="/" component={LandingPage}/>
      </Switch>
    </Router>
  );
}

export default App;
