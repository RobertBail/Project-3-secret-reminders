//import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Button, Tab } from 'react-bootstrap';
//import SignupForm from './SignupForm';
//import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  //const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar class="navbar navbar-expand-lg">
        <Container fluid>
          <Navbar.Brand class="navbar-brand">
            <strong>Secret Reminders: remind yourself of secrets and keep track of them...</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex navbar navbar-expand-lg navbar-light bg-light m-1'>
             
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
               
                  <Nav.Link as={Link} to='/reminders'>
                  <strong>Your Secret Reminders</strong>
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout} as={Link} to='/'><strong>Logout</strong></Nav.Link>
                  
                </>
              ) : (
                
                <Nav.Link as={Link} to='/'><strong>Login/Sign Up</strong></Nav.Link>
             
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
