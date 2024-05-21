import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const CryptoData = () => {
  const { user } = useAuth();
  const [cryptoData, setCryptoData] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/v1/last/crypto/eth');
        setCryptoData(response.data);
        if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            cryptos: [
              {
                name: response.data.symbol,
                currentPrice: response.data.last_trade.price,
                marketCap: response.data.last_trade.size,
                priceChange: response.data.last_trade.conditions[0],
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, [user, db]);

  return (
    <div>
      <h1>Cryptocurrency Data</h1>
      {cryptoData && (
        <div>
          <h2>{cryptoData.symbol}</h2>
          <p>Current Price: ${cryptoData.last_trade.price}</p>
          <p>Market Cap: ${cryptoData.last_trade.size}</p>
          <p>24h Change: {cryptoData.last_trade.conditions[0]}%</p>
        </div>
      )}
    </div>
  );
};

export default CryptoData;