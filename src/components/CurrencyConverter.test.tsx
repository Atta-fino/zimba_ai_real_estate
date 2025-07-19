import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CurrencyConverter from './CurrencyConverter';

test('renders currency converter correctly', async () => {
  render(<CurrencyConverter />);

  expect(screen.getByText('Currency Converter')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/=/)).toBeInTheDocument();
  })
});
