import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const StockData = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/v1/last/stocks/AAPL');
        setData(response.data);
        if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            stocks: [
              {
                ticker: response.data.ticker,
                volume: response.data.results[0].v,
                openPrice: response.data.results[0].o,
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, db]);

  return (
    <div>
      <h1>Stock Data</h1>
      {data && (
        <div>
          <p>Ticker: {data.ticker}</p>
          <p>Volume: {data.results[0].v}</p>
          <p>Open Price: {data.results[0].o}</p>
        </div>
      )}
    </div>
  );
};

export default StockData;