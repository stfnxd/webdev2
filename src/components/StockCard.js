import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StockCard = ({ ticker, volume, openPrice }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Ticker: {ticker}
        </Typography>
        <Typography>
          Volume: {volume}
        </Typography>
        <Typography>
          Open Price: {openPrice}
        </Typography>
        {/* Tilføj mere information efter behov */}
      </CardContent>
    </Card>
  );
};

export default StockCard;