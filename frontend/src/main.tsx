import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path='*' element={<App />} />
    </Routes>
  </BrowserRouter>
);
