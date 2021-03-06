import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexApp from './IndexApp';
import Login from './components/Login';
import SignUp from './components/SignUp';
import BannedAlert from './components/BannedAlert';
import Static from './services/Static';

function App() {

  function showBanAlert(block) {
    if (Static.getCookie('banAlert') !== null) {
      Static.eraseCookie('banAlert');
      return block;
    }
  }

  return (
    <div className='AppContainer'>
      <Router>
        {
          showBanAlert(
            <BannedAlert />
          )
        }
        <div id='alertBlock'></div>
        <Switch>
          <Route path='/components/Login' exact component={Login} />
          <Route path='/components/SignUp' exact component={SignUp} />
          <Route path='/' exact component={Login} />

          <Route path='/IndexApp' exact component={IndexApp} />
          <Route path='/components/profile' exact component={IndexApp} />
          <Route path='/components/home' exact component={IndexApp} />
          <Route path='/components/ProductDetails' exact component={IndexApp} />
          <Route path='/components/AddProd' exact component={IndexApp} />
          <Route path='/components/News' exact component={IndexApp} />
          <Route path='/components/UserManagment' exact component={IndexApp} />
          <Route path='/components/CartPreview' exact component={IndexApp} />
          <Route path='/components/OrdersPreview' exact component={IndexApp} />
          <Route path='/components/ReservedPreview' exact component={IndexApp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
