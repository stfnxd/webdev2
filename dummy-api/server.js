// Import dependencies
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000'
  }));
// Define routes
app.get('/v1/last/stocks/:symbol', (req, res) => {
    // Return test data for the requested stock symbol
    const symbol = req.params.symbol;
    const testData = {
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
        ],
        status: 'OK',
        request_id: 'dummy-request-id',
        count: 1
    };
    res.json(testData);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
