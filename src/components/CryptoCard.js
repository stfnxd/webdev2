import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CryptoCard = ({ name, currentPrice, marketCap, priceChange }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography>
          Current Price: ${currentPrice}
        </Typography>
        <Typography>
          Market Cap: ${marketCap}
        </Typography>
        <Typography>
          24h Change: {priceChange}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;