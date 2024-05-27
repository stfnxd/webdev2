import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LOADING_TEXT } from '../utils/constants';

const StockCard = ({ symbol, isFavorite, onFavoriteToggle }) => {
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

    const priceChange = stockData ? stockData.c - stockData.o : 0;

    const handleFavoriteClick = () => {
        onFavoriteToggle(symbol, 'stock');
    };

    return (
        <Card style={{ margin: 16, position: 'relative' }}>
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
                    ${stockData ? stockData.c.toFixed(2) : LOADING_TEXT}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Open: ${stockData ? stockData.o.toFixed(2) : LOADING_TEXT}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    High: ${stockData ? stockData.h.toFixed(2) : LOADING_TEXT}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Low: ${stockData ? stockData.l.toFixed(2) : LOADING_TEXT}
                </Typography>
                <Box position="absolute" bottom={8} right={8}>
                    <IconButton onClick={handleFavoriteClick}>
                        {isFavorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default StockCard;