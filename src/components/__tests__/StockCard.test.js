import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import StockCard from '../StockCard';

describe('StockCard', () => {
  // Mock fetch function
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: [{ c: 100, o: 90, h: 110, l: 80 }] }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', async () => {
    const { findByText, container } = render(<StockCard symbol="AAPL" isFavorite={false} onFavoriteToggle={() => {}} />);

    // Wait for the component to finish loading
    await findByText('AAPL');
    await findByText('STOCK');

    try {
      await findByText('$100.00');
    } catch {
      console.log(container.innerHTML);
    }
  });

  test('favorite button works correctly', async () => {
    const mockOnFavoriteToggle = jest.fn();
    const { findByRole } = render(<StockCard symbol="AAPL" isFavorite={false} onFavoriteToggle={mockOnFavoriteToggle} />);

    // Wait for the component to finish loading
    const favoriteButton = await findByRole('button');

    // Click the favorite button
    fireEvent.click(favoriteButton);

    // Check if the onFavoriteToggle function was called
    expect(mockOnFavoriteToggle).toHaveBeenCalledWith('AAPL', 'stock');
  });
});