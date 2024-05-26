import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CryptoCard = ({ symbol }) => {
    const [cryptoData, setCryptoData] = useState(null);
    const [prevPrice, setPrevPrice] = useState(null);

    useEffect(() => {
        const fetchCryptoData = async () => {
            const response = await fetch(`http://localhost:3001/v1/last/crypto/${symbol}`);
            const data = await response.json();
            setCryptoData(data.last_trade);
            setPrevPrice(cryptoData ? cryptoData.price : null);
        };

        // Call fetchCryptoData immediately and then every second
        fetchCryptoData();
        const intervalId = setInterval(fetchCryptoData, 10000);

        // Clean up function
        return () => clearInterval(intervalId);
    }, [symbol]);

    const priceChange = cryptoData && prevPrice ? cryptoData.price - prevPrice : 0;

    return (
        <Card style={{ margin: 16 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {symbol}
                </Typography>
                <Typography variant="h3" component="div">
                    ${cryptoData ? cryptoData.price.toFixed(2) : 'Loading...'}
                </Typography>
                {cryptoData && (
                    <IconButton color={priceChange > 0 ? 'primary' : 'secondary'}>
                        {priceChange > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </IconButton>
                )}
                <Typography variant="body2" color="text.secondary">
                    Size: {cryptoData ? cryptoData.size : 'Loading...'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Exchange: {cryptoData ? cryptoData.exchange : 'Loading...'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Timestamp: {cryptoData ? new Date(cryptoData.timestamp).toLocaleString() : 'Loading...'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CryptoCard;