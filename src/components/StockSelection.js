import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import { db } from '../firebaseConfig'; // adjust the path to match your file structure
import { doc, getDoc, setDoc } from "firebase/firestore";

const StockSelection = ({ onSelect }) => {
    const [stocks, setStocks] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const selectedStocksRef = doc(db, 'selectedStocks', 'selected');

        getDoc(selectedStocksRef).then((docSnapshot) => {
            if (docSnapshot.exists()) {
                setSelectedStocks(docSnapshot.data().stocks || []);
            }
            setLoading(false);
        }).catch((error) => {
            console.error("Error reading from Firestore: ", error);
            setLoading(false);
        });

        // Fetch the list of stocks (hardcoded or from a service)
        setStocks(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN']);
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedStocks(value);
        onSelect(value);

        // Save the selected stocks to Firestore
        const selectedStocksRef = doc(db, 'selectedStocks', 'selected');
        setDoc(selectedStocksRef, { stocks: value });
    };

    if (loading) {
        return <div>Loading...</div>;
    }
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