import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './style/IndexApp.css'
import Nav from './components/Nav'
import Profile from './components/Profile'

function App() {
  let history = useHistory();

  useEffect(() => {
    checkSession();
  }, [])

  function checkSession() {
    if (sessionStorage.getItem('name') == null)
      history.push('/');
  }

  return (
    <Router>
      <div>
        <div className='indexContainer'>
          <Nav />
          <Route path='/components/Profile' exact component={Profile} />
        </div>
      </div>

    </Router>
  );
}

export default App;
