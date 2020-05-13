import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './style/IndexApp.css'
import Nav from './components/Nav'
function App() {
  const [name, setName] = useState('');
  let history = useHistory();

  useEffect(() => {
    checkSession();
  }, [])

  function checkSession() {
    if (sessionStorage.getItem('name') != null) {
      setName(sessionStorage.getItem('name'));
    } else
      history.push('/');
  }

  return (
    <div>
      <Nav />
      <div className='indexContainer'>
        <h1>Welcome {name}</h1>
        <Router>

        </Router>
      </div>
    </div>
  );
}

export default App;
