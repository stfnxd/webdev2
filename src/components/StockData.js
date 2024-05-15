
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/v1/last/stocks/AAPL'); // Erstat 'AAPL' med det ønskede aktiesymbol
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Stock Data</h1>
      {data && (
        <div>
          <p>Ticker: {data.ticker}</p>
          <p>Volume: {data.results[0].v}</p>
          <p>Open Price: {data.results[0].o}</p>
          {/* Tilføj flere data, som du vil vise */}
        </div>
      )}
    </div>
  );
};

export default StockData;
