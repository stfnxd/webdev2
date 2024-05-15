// src/pages/StockPage.js

import React from 'react';
import StockData from '../components/StockData'; // Importer StockData-komponenten

const StockPage = () => {
  return (
    <div>
      <h1>Stock Page</h1>
      <StockData /> {/* Indsæt StockData-komponenten her */}
    </div>
  );
};

export default StockPage;