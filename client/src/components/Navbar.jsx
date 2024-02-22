//import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
//import SignupForm from './SignupForm';
//import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  //const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar class="navbar navbar-expand-lg navbar-light bg-light">
        <Container fluid>
          <Navbar.Brand class="navbar navbar-expand-lg navbar-light bg-light m-1">
            Secret Reminders: Remind yourself of secrets and keep track of them...
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex navbar navbar-expand-lg navbar-light bg-light m-1'>
             
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/reminders'>
                  Your Secret Reminders
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout} as={Link} to='/'>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to='/'>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
     
    </>
  );
};

export default AppNavbar;
