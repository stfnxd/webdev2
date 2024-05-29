import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StockSelection from '../StockSelection';
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

describe('StockSelection Component', () => {
  const mockDocRef = { id: 'mockDocRef' }; // Define the mockDocRef

  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure doc always returns mockDocRef
    doc.mockReturnValue(mockDocRef);
  });

  test('renders the StockSelection component correctly', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => false });

    render(<StockSelection onSelect={jest.fn()} />);

    // Verify loading state is shown
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Verify form controls are rendered
    expect(screen.getByLabelText('Select Stocks')).toBeInTheDocument();
  });

  test('handles stock selection and updates Firestore', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => false });

    const handleSelect = jest.fn();
    render(<StockSelection onSelect={handleSelect} />);

    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Select stocks
    fireEvent.mouseDown(screen.getByLabelText('Select Stocks'));
    fireEvent.click(screen.getByText('AAPL'));
    fireEvent.click(screen.getByText('GOOGL'));
    fireEvent.click(document.body); // Close the dropdown

    await waitFor(() => {
      expect(handleSelect).toHaveBeenCalledWith(['AAPL', 'GOOGL']);
    });

    // Simulate a Firestore update
    await waitFor(() => expect(setDoc).toHaveBeenCalledWith(mockDocRef, { stocks: ['AAPL', 'GOOGL'] }));
  });

  test('loads selected stocks from Firestore and displays them correctly', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({ stocks: ['AAPL', 'GOOGL'] }) });

    render(<StockSelection onSelect={jest.fn()} />);

    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Verify selected stocks are shown
    expect(screen.getByText('AAPL, GOOGL')).toBeInTheDocument();
  });

  test('handles errors when fetching from Firestore', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    getDoc.mockRejectedValueOnce(new Error('Firestore error'));

    render(<StockSelection onSelect={jest.fn()} />);

    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Verify form controls are rendered despite the error
    expect(screen.getByLabelText('Select Stocks')).toBeInTheDocument();

    // Verify error is logged
    expect(consoleSpy).toHaveBeenCalledWith("Error reading from Firestore: ", new Error('Firestore error'));

    consoleSpy.mockRestore();
  });
});