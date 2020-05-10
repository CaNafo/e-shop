import React from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IndexApp from './IndexApp';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/components/Login' exact component={Login} />
        <Route path='/components/SignUp' exact component={SignUp} />
        <Route path='/' exact component={Login} />

        <Route path='/IndexApp' exact component={IndexApp} />
      </Router>
    </div>
  );
}

export default App;
