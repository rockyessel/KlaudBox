import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DownloadPage, FileDetails, HomePage, UploadPage } from './pages';
import { Navbar } from './components';

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/uploads' element={<UploadPage />} />
        <Route path='/find-file' element={<DownloadPage />} />
        <Route path='/files/:filename' element={<FileDetails />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
