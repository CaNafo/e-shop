import React from 'react';
import '../App.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import NavServices from '../services/NavService'
import { Link, useHistory } from 'react-router-dom';

function Navigation() {

  let history = useHistory();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">E-Shop</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <Navbar.Text className='mr-sm-1'>Logged in as</Navbar.Text>
          <Link to="/components/profile"><Button variant='outline-light' className='mr-sm-2 btn-sm'>Marko</Button></Link>
          <Button variant="outline-info btn-sm" onClick={event => NavServices.logout(history)}>Log out</Button>
        </Form>
      </Navbar>
    </>
  );
}

export default Navigation;
