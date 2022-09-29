import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { appSlice } from '../store/reducers/app';
import { useAppDispatch } from '../redux-hooks';

const Header = () => {
  const dispatch = useAppDispatch();
  const { setRegion } = appSlice.actions;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Faker App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Form.Select
              aria-label="Country"
              onChange={(e) => dispatch(setRegion(e.target.value))}
              style={{ cursor: 'pointer' }}
              defaultValue="Country"
            >
              <option disabled>Country</option>
              <option value="ru">Russia</option>
              <option value="en_US">USA</option>
              <option value="zh_CN">China</option>
            </Form.Select>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
