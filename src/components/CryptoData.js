// src/components/CryptoData.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoData = () => {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum' // Tilføj de kryptovalutaer, du ønsker at hente data for
          }
        });
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div>
      <h1>Cryptocurrency Data</h1>
      {cryptoData && cryptoData.map((crypto) => (
        <div key={crypto.id}>
          <h2>{crypto.name}</h2>
          <p>Current Price: ${crypto.current_price}</p>
          <p>Market Cap: ${crypto.market_cap}</p>
          <p>24h Change: {crypto.price_change_percentage_24h}%</p>
        </div>
      ))}
    </div>
  );
};

export default CryptoData;
