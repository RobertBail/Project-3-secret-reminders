import { useQuery } from "@apollo/client";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const Home = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <main>
      <Container >
  <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(true)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
              <Nav.Item >
                Welcome to Secret Reminders... 
              </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(true)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignupForm handleModalClose={() => setShowModal(true)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
       </Modal>
     </Container>
    </main>
  );
};

export default Home;
