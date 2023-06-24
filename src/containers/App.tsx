import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from '../components/SimpleSidebar';

function App() {
  return (
    <>
      <ToastContainer />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
