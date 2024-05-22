import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';

const StockSelection = ({ onSelect }) => {
    const [stocks, setStocks] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);

    useEffect(() => {
        // Fetch the list of stocks (hardcoded or from a service)
        setStocks(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN']);
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedStocks(value);
        onSelect(value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="stock-selection-label">Select Stocks</InputLabel>
            <Select
                labelId="stock-selection-label"
                multiple
                value={selectedStocks}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
            >
                {stocks.map((stock) => (
                    <MenuItem key={stock} value={stock}>
                        <Checkbox checked={selectedStocks.indexOf(stock) > -1} />
                        <ListItemText primary={stock} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default StockSelection;