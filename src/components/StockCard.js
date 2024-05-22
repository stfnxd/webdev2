import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';

const StockCard = ({ symbol }) => {
    const [stockData, setStockData] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            const response = await fetch(`http://localhost:3001/v1/last/stocks/${symbol}`);
            const data = await response.json();
            setStockData(data.results[0]);
        };
        fetchStockData();
    }, [symbol]);

    return (
        <Paper style={{ padding: 16 }}>
            {stockData ? (
                <>
                    <Typography variant="h6">{symbol}</Typography>
                    <Typography>Open: ${stockData.o.toFixed(2)}</Typography>
                    <Typography>Close: ${stockData.c.toFixed(2)}</Typography>
                    <Typography>High: ${stockData.h.toFixed(2)}</Typography>
                    <Typography>Low: ${stockData.l.toFixed(2)}</Typography>
                    <Typography>Volume: {stockData.v}</Typography>
                    <Typography>VWAP: ${stockData.vw.toFixed(2)}</Typography>
                </>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Paper>
    );
};

export default StockCard;
