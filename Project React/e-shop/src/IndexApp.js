import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import './style/IndexApp.css'
import Nav from './components/Nav'
import Profile from './components/Profile'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'

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
    <div>
      <div className='indexContainer'>
        <Nav />
        <Route path='/components/profile' exact component={Profile} />
        <Route path='/components/home' exact component={Home} />
        <Route path='/indexApp' exact component={Home} />
        <Route path='/components/news' exact component={Profile} />
        <Route path='/components/ProductDetails' exact component={ProductDetails} />
      </div>
    </div>

  );
}

export default IndexApp;
