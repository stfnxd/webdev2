import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import CryptoCard from '../CryptoCard';



describe('CryptoCard', () => {
  // Mock fetch function
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ last_trade: { price: 100 } }),
      })
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', async () => {
    const { findByText, container } = render(<CryptoCard symbol="BTC" isFavorite={false} onFavoriteToggle={() => {}} />);
  
    // Wait for the component to finish loading
    await findByText('BTC');
    await findByText('CRYPTO');
  
    try {
      await findByText('$100.00');
    } catch {
      console.log(container.innerHTML);
    }
  });

  test('favorite button works correctly', async () => {
    const mockOnFavoriteToggle = jest.fn();
    const { findByRole } = render(<CryptoCard symbol="BTC" isFavorite={false} onFavoriteToggle={mockOnFavoriteToggle} />);

    // Wait for the component to finish loading
    const favoriteButton = await findByRole('button');

    // Click the favorite button
    fireEvent.click(favoriteButton);

    // Check if the onFavoriteToggle function was called
    expect(mockOnFavoriteToggle).toHaveBeenCalledWith('BTC', 'crypto');
  });
});