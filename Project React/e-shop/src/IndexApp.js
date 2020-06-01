import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import './style/IndexApp.css'
import Nav from './components/Nav'
import Profile from './components/Profile'
import Home from './components/Home'
import News from './components/News'
import UserManagment from './components/UserManagment'
import ProductDetails from './components/ProductDetails'
import Static from './services/Static'

function IndexApp() {

  let history = useHistory();

  function checkSession() {
    if (sessionStorage.getItem('name') == null)
      history.push('/');
    else if (!Static.checkForRoles()) {
      sessionStorage.clear();
      Static.setCookie('banAlert', '1', 1);
      history.push('/');
    } else {
      return (
        <div className='indexContainer'>
          <Nav />
          <Route path='/components/profile' exact component={Profile} />
          <Route path='/components/home' exact component={Home} />
          <Route path='/indexApp' exact component={News} />
          <Route path='/components/news' exact component={News} />
          <Route path='/components/ProductDetails' exact component={ProductDetails} />
          <Route path='/components/UserManagment' exact component={UserManagment} />
        </div>
      );
    }
  }


  return (
    <div>
      {
        checkSession()
      }
    </div>

  );
}

export default IndexApp;
