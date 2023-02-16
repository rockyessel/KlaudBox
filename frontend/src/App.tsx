import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, UploadPage } from './pages';
import { Navbar } from './components';

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/uploads' element={<UploadPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
