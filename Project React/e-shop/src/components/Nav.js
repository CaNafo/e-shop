import React from 'react';
import '../App.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import NavServices from '../services/NavService'
import { Link, useHistory } from 'react-router-dom';
import Static from '../services/Static'

function Navigation() {

  let history = useHistory();
  var name = '';

  function getName() {
    if (Static.getUser() != null) {
      name = Static.getUser().firstName;
    } else {
      name = '';
    }

    return name;
  }

  return (
    <>
      <Navbar variant="dark" expant='lg' className='navBackground'>
        <Navbar.Brand as={Link} to="/components/news" className='custNav'>E-Shop</Navbar.Brand>
        <Nav className="container"  >
          <Nav.Item>
            <Nav>
              <Nav.Item>
                <Nav.Link className='navItem' as={Link} to="/components/news">News</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='navItem' as={Link} to="/components/home">Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='navItem' as={Link} to="/components/UserManagment">User Managment</Nav.Link>
              </Nav.Item>
            </Nav>
          </Nav.Item>
          <Nav.Item>
            <Navbar.Text className='mr-sm-1 navbarText'>Logged in as</Navbar.Text>
            <Link to="/components/profile"><Button variant='outline-light' className='mr-sm-2 btn-sm'>{getName()}</Button></Link>
            <Button variant="outline-warning btn-sm" onClick={event => NavServices.logout(history)}>Log out</Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigation;
