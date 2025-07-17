import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MortgageCalculator from './MortgageCalculator';

test('renders mortgage calculator correctly', () => {
  render(<MortgageCalculator />);

  expect(screen.getByText('Mortgage Calculator')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Calculate'));

  expect(screen.getByText(/Monthly Payment:/)).toBeInTheDocument();
});
