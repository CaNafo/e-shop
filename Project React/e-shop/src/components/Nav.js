import React from 'react';
import '../App.css';
import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import NavServices from '../services/NavService'
import { Link, useHistory } from 'react-router-dom';

function Navigation() {

  let history = useHistory();

  return (
    <>
      <Navbar variant="dark" expant='lg' className='navBackground'>
        <Navbar.Brand as={Link} to="/components/home" className='custNav'>E-Shop</Navbar.Brand>
        <Nav className="container-fluid"  >
          <Nav.Item>
            <Nav>
              <Nav.Item>
                <Nav.Link as={Link} to="/components/home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/components/profile">News</Nav.Link>
              </Nav.Item>
            </Nav>
          </Nav.Item>
        </Nav>
        <Nav className='container ml-auto'>
          <Nav.Item>
            <Form inline className='ml-auto'>
              <Navbar.Text className='mr-sm-1'>Logged in as</Navbar.Text>
              <Link to="/components/profile"><Button variant='outline-light' className='mr-sm-2 btn-sm'>{sessionStorage.getItem("name")}</Button></Link>
              <Button variant="outline-warning btn-sm " onClick={event => NavServices.logout(history)}>Log out</Button>
            </Form>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigation;
