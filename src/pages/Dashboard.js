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
                }
            }
        };
        fetchUserData();
    }, []);

    const handleSelectStocks = async (stocks) => {
        setSelectedStocks(stocks);
        if (user) {
            await setDoc(doc(db, 'users', user.uid), { selectedStocks: stocks }, { merge: true });
        }
    };

    const handleSelectCryptos = async (cryptos) => {
        setSelectedCryptos(cryptos);
        if (user) {
            await setDoc(doc(db, 'users', user.uid), { selectedCryptos: cryptos }, { merge: true });
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: 16 }}>
                    <StockSelection onSelect={handleSelectStocks} selectedStocks={selectedStocks} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: 16 }}>
                        <CryptoSelection onSelect={handleSelectCryptos} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{ marginTop: 16 }}>
                {selectedStocks.map(stock => (
                    <Grid item xs={12} sm={6} md={4} key={stock}>
                        <StockCard symbol={stock} />
                    </Grid>
                ))}
                {selectedCryptos.map(crypto => (
                    <Grid item xs={12} sm={6} md={4} key={crypto}>
                        <CryptoCard symbol={crypto} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard;
