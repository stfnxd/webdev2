import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LOADING_TEXT } from '../utils/constants';
import { API_URL } from '../utils/constants';

// CryptoCard component
const CryptoCard = ({ symbol, isFavorite, onFavoriteToggle }) => {
    // State for storing crypto data and initial price
    const [cryptoData, setCryptoData] = useState(null);
    const [initialPrice, setInitialPrice] = useState(null);

    // Effect hook for fetching crypto data
    useEffect(() => {
        // Function to fetch crypto data
        const fetchCryptoData = async () => {
            // Fetch data from API
            const response = await fetch(`${API_URL}/crypto/${symbol}`);
            const data = await response.json();
            // Set initial price if it's not set yet
            if (initialPrice === null) {
                setInitialPrice(data.last_trade.price);
            }
            // Set crypto data
            setCryptoData(data.last_trade);
        };

        // Fetch crypto data initially and every 10 seconds
        fetchCryptoData();
        const intervalId = setInterval(fetchCryptoData, 10000);

        // Cleanup function to clear interval
        return () => clearInterval(intervalId);
    }, [symbol, initialPrice]);

    // Calculate price change
    const priceChange = cryptoData ? cryptoData.price - initialPrice : 0;

    // Handler for favorite button click
    const handleFavoriteClick = () => {
        onFavoriteToggle(symbol, 'crypto');
    };

    // Render the component
    return (
        <Card style={{ margin: 16, position: 'relative' }}>
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
                <Box position="absolute" bottom={8} right={8}>
                    <IconButton onClick={handleFavoriteClick} style={{ marginBottom: '-0.5rem' }}>
                        {isFavorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CryptoCard;