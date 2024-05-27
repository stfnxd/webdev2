import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import StockSelection from '../components/StockSelection';
import CryptoSelection from '../components/CryptoSelection';
import StockCard from '../components/StockCard';
import CryptoCard from '../components/CryptoCard';
import { Container, Grid, Paper, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

const Dashboard = () => {
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [selectedCryptos, setSelectedCryptos] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
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
                    setFavoriteItems(data.favoriteItems || []);
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

    const handleFavoriteToggle = async (symbol, type) => {
        let newFavorites;
        if (favoriteItems.some(item => item.symbol === symbol)) {
            newFavorites = favoriteItems.filter(item => item.symbol !== symbol);
        } else {
            newFavorites = [...favoriteItems, { symbol, type }];
        }
        setFavoriteItems(newFavorites);
        if (user) {
            await setDoc(doc(db, 'users', user.uid), { favoriteItems: newFavorites }, { merge: true });
        }
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Typography variant="subtitle1">Last Updated At: {lastUpdated}</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Paper style={{ padding: 16, marginBottom: '2rem', marginTop: '1rem' }}>
                        <StockSelection onSelect={handleSelectStocks} selectedStocks={selectedStocks} />
                    </Paper>
                    <Paper style={{ padding: 16 }}>
                        <CryptoSelection onSelect={handleSelectCryptos} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        {favoriteItems.map(item => (
                            <Grid item xs={12} sm={4} md={4} key={item.symbol}>
                                {item.type === 'stock' ? (
                                    <StockCard
                                        symbol={item.symbol}
                                        isFavorite={true}
                                        onFavoriteToggle={handleFavoriteToggle}
                                    />
                                ) : (
                                    <CryptoCard
                                        symbol={item.symbol}
                                        isFavorite={true}
                                        onFavoriteToggle={handleFavoriteToggle}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={3}>
                        {selectedStocks.filter(stock => !favoriteItems.some(item => item.symbol === stock && item.type === 'stock')).map(stock => (
                            <Grid item xs={12} sm={4} md={4} key={stock}>
                                <StockCard
                                    symbol={stock}
                                    isFavorite={false}
                                    onFavoriteToggle={handleFavoriteToggle}
                                />
                            </Grid>
                        ))}
                        {selectedCryptos.filter(crypto => !favoriteItems.some(item => item.symbol === crypto && item.type === 'crypto')).map(crypto => (
                            <Grid item xs={12} sm={4} md={4} key={crypto}>
                                <CryptoCard
                                    symbol={crypto}
                                    isFavorite={false}
                                    onFavoriteToggle={handleFavoriteToggle}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
