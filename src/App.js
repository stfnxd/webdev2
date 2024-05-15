// src/App.js

import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StockPage from './pages/StockPage'; // Importer din StockPage

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

      {/* Routes */}
        <Route path="/" element={<StockPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
