import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import Login from './pages/Login';
import './App.css';
import Game from './pages/Game';
import Config from './pages/Config';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/config" component={ Config } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
      {/* <img src={ logo } className="App-logo" alt="logo" /> */}
    </div>
  );
}
