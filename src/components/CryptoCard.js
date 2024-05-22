import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';

const CryptoCard = ({ symbol }) => {
    const [cryptoData, setCryptoData] = useState(null);

    
 

    useEffect(() => {
        const fetchCryptoData = async () => {
            const response = await fetch(`http://localhost:3001/v1/last/crypto/${symbol}`);
            const data = await response.json();
            setCryptoData(data.last_trade);
        };
        fetchCryptoData();
    }, [symbol]);

    return (
        <Paper style={{ padding: 16 }}>
            {cryptoData ? (
                <>
                    <Typography variant="h6">{symbol}</Typography>
                    <Typography>Price: ${cryptoData.price.toFixed(2)}</Typography>
                    <Typography>Size: {cryptoData.size}</Typography>
                    <Typography>Exchange: {cryptoData.exchange}</Typography>
                    <Typography>Timestamp: {new Date(cryptoData.timestamp).toLocaleString()}</Typography>
                </>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Paper>
    );
};

export default CryptoCard;
