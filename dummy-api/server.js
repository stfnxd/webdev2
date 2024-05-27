
// Import dependencies
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Hardcoded stock data
const stockData = {
    AAPL: {
        status: 'OK',
        request_id: 'dummy-request-id',
        ticker: 'AAPL',
        queryCount: 1,
        resultsCount: 1,
        adjusted: true,
        results: [
            {
                T: 'AAPL',
                v: 5000000,
                vw: 150,
                o: 148,
                c: 151,
                h: 152,
                l: 147,
                t: Date.now(),
                n: 2000
            }
        ]
    },
    GOOGL: {
        status: 'OK',
        request_id: 'dummy-request-id',
        ticker: 'GOOGL',
        queryCount: 1,
        resultsCount: 1,
        adjusted: true,
        results: [
            {
                T: 'GOOGL',
                v: 3000000,
                vw: 2750,
                o: 2740,
                c: 2760,
                h: 2770,
                l: 2730,
                t: Date.now(),
                n: 1500
            }
        ]
    },
    MSFT: {
        status: 'OK',
        request_id: 'dummy-request-id',
        ticker: 'MSFT',
        queryCount: 1,
        resultsCount: 1,
        adjusted: true,
        results: [
            {
                T: 'MSFT',
                v: 4000000,
                vw: 290,
                o: 288,
                c: 291,
                h: 292,
                l: 287,
                t: Date.now(),
                n: 1700
            }
        ]
    },
    TSLA: {
        status: 'OK',
        request_id: 'dummy-request-id',
        ticker: 'TSLA',
        queryCount: 1,
        resultsCount: 1,
        adjusted: true,
        results: [
            {
                T: 'TSLA',
                v: 2500000,
                vw: 700,
                o: 690,
                c: 7100,
                h: 715,
                l: 685,
                t: Date.now(),
                n: 1800
            }
        ]
    },
    AMZN: {
        status: 'OK',
        request_id: 'dummy-request-id',
        ticker: 'AMZN',
        queryCount: 1,
        resultsCount: 1,
        adjusted: true,
        results: [
            {
                T: 'AMZN',
                v: 3200000,
                vw: 3400,
                o: 3380,
                c: 3420,
                h: 3430,
                l: 3360,
                t: Date.now(),
                n: 1600
            }
        ]
    }
};

// Hardcoded crypto data
const cryptoData = {
    BTC: {
        status: 'OK',
        request_id: 'dummy-request-id',
        symbol: 'BTC',
        last_trade: {
            price: 45000,
            size: 0.5,
            exchange: 1,
            conditions: [1],
            timestamp: Date.now()
        }
    },
    ETH: {
        status: 'OK',
        request_id: 'dummy-request-id',
        symbol: 'ETH',
        last_trade: {
            price: 3000,
            size: 2,
            exchange: 1,
            conditions: [1],
            timestamp: Date.now()
        }
    },
    DOGE: {
        status: 'OK',
        request_id: 'dummy-request-id',
        symbol: 'DOGE',
        last_trade: {
            price: 0.3,
            size: 1000,
            exchange: 1,
            conditions: [1],
            timestamp: Date.now()
        }
    },
    ADA: {
        status: 'OK',
        request_id: 'dummy-request-id',
        symbol: 'ADA',
        last_trade: {
            price: 1.2,
            size: 500,
            exchange: 1,
            conditions: [1],
            timestamp: Date.now()
        }
    },
    XRP: {
        status: 'OK',
        request_id: 'dummy-request-id',
        symbol: 'XRP',
        last_trade: {
            price: 1.5,
            size: 600,
            exchange: 1,
            conditions: [1],
            timestamp: Date.now()
        }
    }
};

// Funktion til at generere et tilfældigt tal inden for et interval
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Funktion til at opdatere aktiedata
function updateStockData() {
    for (let ticker in stockData) {
        const stock = stockData[ticker];
        const result = stock.results[0];
        const change = getRandomArbitrary(-5, 5);
        // result.o = result.c;
        result.c += change;
        result.h = Math.max(result.h, result.c);
        result.l = Math.min(result.l, result.c);
        result.vw = (result.vw * result.v + result.c * result.n) / (result.v + result.n);
        result.v += Math.round(getRandomArbitrary(100000, 500000));
        result.n += Math.round(getRandomArbitrary(100, 500));
        result.t = Date.now();
    }
}

// Funktion til at opdatere krypto-data
function updateCryptoData() {
    for (let symbol in cryptoData) {
        const crypto = cryptoData[symbol];
        const lastTrade = crypto.last_trade;
        const change = getRandomArbitrary(-0.05, 0.05);
        lastTrade.price += change;
        lastTrade.size += Math.round(getRandomArbitrary(10, 100));
        lastTrade.timestamp = Date.now();
    }
}

// Opdater data hvert sekund
setInterval(() => {
    updateStockData();
    updateCryptoData();
}, 10000);

app.get('/v1/last/stocks/:symbol', (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const data = stockData[symbol];
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ status: 'Error', message: 'Stock symbol not found' });
    }
});

// Define routes for crypto data
app.get('/v1/last/crypto/:symbol', (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const data = cryptoData[symbol];
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ status: 'Error', message: 'Crypto symbol not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});