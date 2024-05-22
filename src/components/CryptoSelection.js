import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';

const CryptoSelection = ({ onSelect }) => {
    const [cryptos, setCryptos] = useState([]);
    const [selectedCryptos, setSelectedCryptos] = useState([]);

    useEffect(() => {
        // Fetch the list of cryptos (hardcoded or from a service)
        setCryptos(['XRP', 'ADA', 'DOGE', 'ETH', 'BTC']);
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedCryptos(value);
        onSelect(value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="crypto-selection-label">Select Cryptos</InputLabel>
            <Select
                labelId="crypto-selection-label"
                multiple
                value={selectedCryptos}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
            >
                {cryptos.map((crypto) => (
                    <MenuItem key={crypto} value={crypto}>
                        <Checkbox checked={selectedCryptos.indexOf(crypto) > -1} />
                        <ListItemText primary={crypto} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CryptoSelection;
