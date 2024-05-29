import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CryptoSelection from '../CryptoSelection';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Adjust the path based on your project structure

// Mock Firestore methods
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

// Mock Firestore config
jest.mock('../../firebaseConfig', () => ({
  db: jest.fn(),
}));

describe('CryptoSelection Component', () => {
  const mockDocRef = { id: 'mockDocRef' }; // Define the mockDocRef

  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure doc always returns mockDocRef
    doc.mockReturnValue(mockDocRef);
  });

  test('renders the CryptoSelection component correctly', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => false });

    render(<CryptoSelection onSelect={jest.fn()} />);

    // Verify loading state is shown
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Verify form controls are rendered
    expect(screen.getByLabelText('Select Cryptos')).toBeInTheDocument();
  });

  test('handles crypto selection and updates Firestore', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => false });

    const handleSelect = jest.fn();
    render(<CryptoSelection onSelect={handleSelect} />);

    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Select a crypto
    fireEvent.mouseDown(screen.getByLabelText('Select Cryptos'));
    fireEvent.click(screen.getByText('BTC'));
    fireEvent.click(screen.getByText('ETH'));
    fireEvent.click(document.body); // Close the dropdown

    await waitFor(() => {
      expect(handleSelect).toHaveBeenCalledWith(['BTC', 'ETH']);
    });

    // Simulate a Firestore update
    await waitFor(() => expect(setDoc).toHaveBeenCalledWith(mockDocRef, { cryptos: ['BTC', 'ETH'] }));
  });

  test('loads selected cryptos from Firestore and displays them correctly', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({ cryptos: ['BTC', 'ETH'] }) });

    render(<CryptoSelection onSelect={jest.fn()} />);

    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Verify selected cryptos are shown
    expect(screen.getByText('BTC, ETH')).toBeInTheDocument();
  });

  test('handles errors when fetching from Firestore', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    getDoc.mockRejectedValueOnce(new Error('Firestore error'));

    render(<CryptoSelection onSelect={jest.fn()} />);

    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Verify form controls are rendered despite the error
    expect(screen.getByLabelText('Select Cryptos')).toBeInTheDocument();

    // Verify error is logged
    expect(consoleSpy).toHaveBeenCalledWith("Error reading from Firestore: ", new Error('Firestore error'));

    consoleSpy.mockRestore();
  });
});
