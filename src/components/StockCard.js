import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const StockCard = ({ symbol }) => {
    const [stockData, setStockData] = useState(null);
    const [prevClose, setPrevClose] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            const response = await fetch(`http://localhost:3001/v1/last/stocks/${symbol}`);
            const data = await response.json();
            setPrevClose(stockData ? stockData.c : null);
            if (data.results && Array.isArray(data.results)) {
                setStockData(data.results[0]);
            }
        };

        fetchStockData();
        const intervalId = setInterval(fetchStockData, 10000);

        return () => clearInterval(intervalId);
    }, [symbol]);

    const priceChange = stockData && prevClose ? stockData.c - prevClose : 0;

    return (
        <Card style={{ margin: 16 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start">
                    <Typography variant="h5" component="div">
                        {symbol}
                    </Typography>
                    <Typography variant="body2" color="secondary" align="right">
                        STOCK
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
                    ${stockData ? stockData.c.toFixed(2) : 'Loading...'}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                    Open: ${stockData ? stockData.o.toFixed(2) : 'Loading...'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    High: ${stockData ? stockData.h.toFixed(2) : 'Loading...'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Low: ${stockData ? stockData.l.toFixed(2) : 'Loading...'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Volume: {stockData ? stockData.v : 'Loading...'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    VWAP: ${stockData ? stockData.vw.toFixed(2) : 'Loading...'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StockCard;