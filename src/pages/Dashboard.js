import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import StockSelection from '../components/StockSelection';
import CryptoSelection from '../components/CryptoSelection';
import StockCard from '../components/StockCard';
import CryptoCard from '../components/CryptoCard';
import { Container, Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [selectedCryptos, setSelectedCryptos] = useState([]);
    const [user, setUser] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                setUser(user);
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setSelectedStocks(data.selectedStocks || []);
                    setSelectedCryptos(data.selectedCryptos || []);
                    setLastUpdated(new Date().toLocaleString());
                }
            }
        };
        fetchUserData();
    }, []);

    const handleSelectStocks = async (stocks) => {
        setSelectedStocks(stocks);
        if (user) {
            await setDoc(doc(db, 'users', user.uid), { selectedStocks: stocks }, { merge: true });
            setLastUpdated(new Date().toLocaleString());
        }
    };

    const handleSelectCryptos = async (cryptos) => {
        setSelectedCryptos(cryptos);
        if (user) {
            await setDoc(doc(db, 'users', user.uid), { selectedCryptos: cryptos }, { merge: true });
            setLastUpdated(new Date().toLocaleString());
        }
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Typography variant="subtitle1" >Last Updated At: {lastUpdated}</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Paper style={{ padding: 16, marginBottom: '2rem', marginTop: '1rem'}}>
                        <StockSelection onSelect={handleSelectStocks} selectedStocks={selectedStocks} />
                    </Paper>
                    <Paper style={{ padding: 16 }}>
                        <CryptoSelection onSelect={handleSelectCryptos} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        {selectedStocks.map(stock => (
                            <Grid item xs={12} sm={4} md={4} key={stock}>
                                <StockCard symbol={stock} />
                            </Grid>
                        ))}
                        {selectedCryptos.map(crypto => (
                            <Grid item xs={12} sm={4} md={4} key={crypto}>
                                <CryptoCard symbol={crypto} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;