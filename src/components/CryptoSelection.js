import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import { db } from '../firebaseConfig'; // adjust the path to match your file structure
import { doc, getDoc, setDoc } from "firebase/firestore";
import { LOADING_DIV } from '../utils/constants';

const CryptoSelection = ({ onSelect }) => {
    const [cryptos, setCryptos] = useState([]);
    const [selectedCryptos, setSelectedCryptos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const selectedCryptosRef = doc(db, 'selectedCryptos', 'selected');

        getDoc(selectedCryptosRef).then((docSnapshot) => {
            if (docSnapshot.exists()) {
                setSelectedCryptos(docSnapshot.data().cryptos || []);
            }
            setLoading(false);
        }).catch((error) => {
            console.error("Error reading from Firestore: ", error);
            setLoading(false);
        });

        // Fetch the list of cryptos (hardcoded or from a service)
        setCryptos(['XRP', 'ADA', 'DOGE', 'ETH', 'BTC']);
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedCryptos(value);
        onSelect(value);

        // Save the selected cryptos to Firestore
        const selectedCryptosRef = doc(db, 'selectedCryptos', 'selected');
        setDoc(selectedCryptosRef, { cryptos: value });
    };

    if (loading) {
        return LOADING_DIV;
    }

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