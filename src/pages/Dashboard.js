// src/pages/Dashboard.js

import React from 'react';
import StockData from '../components/StockData';
import CryptoData from '../components/CryptoData';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <StockData />
      <CryptoData />
    </div>
  );
};

export default Dashboard;
