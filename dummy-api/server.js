// Import dependencies
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Define routes for stock data
app.get('/v1/last/stocks/:symbol', (req, res) => {
    // Return test data for the requested stock symbol
    const symbol = req.params.symbol;
    const testData = {
        status: 'OK',
        request_id: 'dummy-request-id',
        ticker: symbol,
        queryCount: 1,
        resultsCount: 1,
        adjusted: true,
        results: [
            {
                T: symbol,
                v: Math.random() * 1000000, // Random volume
                vw: Math.random() * 200, // Random volume weighted average price
                o: Math.random() * 200, // Random open price
                c: Math.random() * 200, // Random close price
                h: Math.random() * 200, // Random high price
                l: Math.random() * 200, // Random low price
                t: Date.now(), // Current timestamp
                n: Math.floor(Math.random() * 1000000) // Random number of trades
            }
        ]
    };
    res.json(testData);
});

// Define routes for crypto data
app.get('/v1/last/crypto/:symbol', (req, res) => {
    // Return test data for the requested crypto symbol
    const symbol = req.params.symbol;
    const testData = {
        status: 'OK',
        request_id: 'dummy-request-id',
        symbol: symbol,
        last_trade: {
            price: Math.random() * 60000, // Random price
            size: Math.random() * 10, // Random size
            exchange: Math.floor(Math.random() * 10), // Random exchange ID
            conditions: [Math.floor(Math.random() * 100)], // Random conditions
            timestamp: Date.now() // Current timestamp
        }
    };
    res.json(testData);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
