import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LOADING_TEXT } from '../utils/constants';


const CryptoCard = ({ symbol, isFavorite, onFavoriteToggle }) => {
    const [cryptoData, setCryptoData] = useState(null);
    const [initialPrice, setInitialPrice] = useState(null);

    useEffect(() => {
        const fetchCryptoData = async () => {
            const response = await fetch(`http://localhost:3001/v1/last/crypto/${symbol}`);
            const data = await response.json();
            if (initialPrice === null) {
                setInitialPrice(data.last_trade.price);
            }
            setCryptoData(data.last_trade);
        };

        fetchCryptoData();
        const intervalId = setInterval(fetchCryptoData, 10000);

        return () => clearInterval(intervalId);
    }, [symbol, initialPrice]);

    const priceChange = cryptoData ? cryptoData.price - initialPrice : 0;

    const handleFavoriteClick = () => {
        onFavoriteToggle(symbol, 'crypto');
    };

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
                    <IconButton onClick={handleFavoriteClick}>
                        {isFavorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CryptoCard;