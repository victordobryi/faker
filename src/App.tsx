import React from 'react';
import ErrorCreator from './components/ErrorCreator';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';

import './styles/main.scss';
import SeedCreator from './components/SeedCreator';
import Users from './components/Users';

export const App = () => (
  <>
    <Header />
    <main className="bg-dark">
      <Container className="d-flex align-items-center justify-content-between mt-2">
        <ErrorCreator />
        <SeedCreator />
      </Container>
      <Container
        className="d-flex align-items-end justify-content-center mt-4"
        style={{ fontSize: '18px' }}
      >
        <Users />
      </Container>
    </main>
    <footer className="bg-dark text-white">Directed by Viktar Kasilkin</footer>
  </>
);

export default App;
