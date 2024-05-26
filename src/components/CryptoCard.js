import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LOADING_TEXT } from '../utils/constants';


const CryptoCard = ({ symbol }) => {
    const [cryptoData, setCryptoData] = useState(null);
    const [prevPrice, setPrevPrice] = useState(null);

    useEffect(() => {
        const fetchCryptoData = async () => {
            const response = await fetch(`http://localhost:3001/v1/last/crypto/${symbol}`);
            const data = await response.json();
            setPrevPrice(cryptoData ? cryptoData.price : null);
            setCryptoData(data.last_trade);
        };

        fetchCryptoData();
        const intervalId = setInterval(fetchCryptoData, 10000);

        return () => clearInterval(intervalId);
    }, [symbol]);

    const priceChange = cryptoData && prevPrice ? cryptoData.price - prevPrice : 0;

    return (
        <Card style={{ margin: 16 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start">
                    <Typography variant="h5" component="div">
                        {symbol}
                    </Typography>
                    <Typography variant="body2" color="primary" align="right">
                        CRYPTO
                    </Typography>
                </Box>
                <Typography variant="h6" component="div">
                    {priceChange > 0 ? 
                        <ArrowDropUpIcon sx={{ color: 'green' }} /> : 
                        <ArrowDropDownIcon sx={{ color: 'red' }} />
                    }
                    {priceChange.toFixed(2)}
                </Typography>
                <Typography variant="h3" component="div">
                    ${cryptoData ? cryptoData.price.toFixed(2) : LOADING_TEXT}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Size: {cryptoData ? cryptoData.size : LOADING_TEXT}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Exchange: {cryptoData ? cryptoData.exchange : LOADING_TEXT}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Timestamp: {cryptoData ? new Date(cryptoData.timestamp).toLocaleString() : LOADING_TEXT}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CryptoCard;