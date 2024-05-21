import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import StockCard from '../components/StockCard';
import CryptoCard from '../components/CryptoCard';
import { useAuth } from '../context/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';



const Dashboard = () => {
  const { user } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const db = getFirestore();
  console.log('User:', user);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setStocks(data.stocks || []);
          setCryptos(data.cryptos || []);
        } else {
          await setDoc(docRef, { stocks: [], cryptos: [] });
        }
      };
      fetchUserData();
    }
  }, [user, db]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Welcome, {user.name}</h1>
      <Grid container spacing={3}>
        {stocks.map((stock, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <StockCard ticker={stock.ticker} volume={stock.volume} openPrice={stock.openPrice} />
          </Grid>
        ))}
        {cryptos.map((crypto, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <CryptoCard
              name={crypto.name}
              currentPrice={crypto.currentPrice}
              marketCap={crypto.marketCap}
              priceChange={crypto.priceChange}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;