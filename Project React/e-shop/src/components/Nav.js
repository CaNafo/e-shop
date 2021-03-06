import React from 'react';
import '../App.css';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
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
 
  function checkIfGuest(){
    if(sessionStorage.getItem('guest') == 'null'){
      return(
        <>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/components/news">News</Nav.Link>
            <Nav.Link as={Link} to="/components/home">Products</Nav.Link>
            {
              Static.checkPermision(
                'UserManagment',
                <>
                  <NavDropdown title="Admin Controls" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/components/UserManagment">Users</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/components/OrdersPreview">Orders</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/components/CartPreview">My Cart</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/components/ReservedPreview">Reserved products</NavDropdown.Item>
                </NavDropdown>
                </>
              )
            }
            {
              Static.dontHavePermision(
                'UserManagment',
                <>
                <Nav.Link as={Link} to="/components/CartPreview">My Cart</Nav.Link>
                </>
              )
            }
              </Nav>
          <Nav>
            <Nav.Link as={Link} to="/components/profile">Hello, {getName()}</Nav.Link>
            <Nav.Link eventKey={2} onClick={event => NavServices.logout(history)}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </>
      );
    }else{
      return(
        <>
        <Nav>
          <Nav.Link eventKey={2} onClick={event => NavServices.logout(history)}>Log in</Nav.Link>
        </Nav>
        </>
      );
    }
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg"  className='navBackground' variant="dark">
      <Navbar.Brand href="#home">E-Shop</Navbar.Brand>
      {
        checkIfGuest()
      }
      </Navbar>
    </>
  );
}

export default Navigation;
