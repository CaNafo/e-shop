import React from 'react';
import '../App.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import NavServices from '../services/NavService'
import { Link, useHistory } from 'react-router-dom';
import Static from '../services/Static'
import Cart from '../icons/cart.png'

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
      <Navbar variant="dark" expant='lg' className='navBackground navbar navbar-expand-lg navbar-dark bg-dark'>
        <Navbar.Brand as={Link} to="/components/news" className='custNav'>E-Shop</Navbar.Brand>
        <Nav className="container" id="navbarSupportedContent"> >
          <Nav.Item>
            <Nav>
              <Nav.Item>
                <Nav.Link className='navItem' as={Link} to="/components/news">News</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='navItem' as={Link} to="/components/home">Products</Nav.Link>
              </Nav.Item>
              {
                Static.checkPermision(
                  'UserManagment',
                  <Nav.Item>
                    <Nav.Link className='navItem' as={Link} to="/components/UserManagment">User Managment</Nav.Link>
                  </Nav.Item>
                )
              }
            </Nav>
          </Nav.Item>
          <Nav.Item className='navUser'>
            <Navbar.Text className='mr-sm-1 navbarText'>Logged in as</Navbar.Text>
            <Link to="/components/profile"><Button variant='outline-light' className='mr-sm-2 btn-sm'>{getName()}</Button></Link>
            <Button variant="outline-warning btn-sm" onClick={event => NavServices.logout(history)}>Log out</Button>
          </Nav.Item>
          {
            Static.checkPermision(
              'AddToCart',
              <Navbar.Brand as={Link} to="/components/CartPreview" className='custNavCart'><img id='cartNav' src={Cart}></img></Navbar.Brand>
              )
          }
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigation;
