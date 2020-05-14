import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import './style/IndexApp.css'
import Nav from './components/Nav'
import Profile from './components/Profile'
import Home from './components/Home'

function IndexApp() {

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
          <Route path='/components/profile' exact component={Profile} />
          <Route path='/components/home' exact component={Home} />
          <Route path='/components/news' exact component={Profile} />
        </div>
      </div>

    </Router>
  );
}

export default IndexApp;
