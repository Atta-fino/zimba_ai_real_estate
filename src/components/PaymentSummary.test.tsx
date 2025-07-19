import React from 'react';
import { render, screen } from '@testing-library/react';
import PaymentSummary from './PaymentSummary';

test('renders payment summary correctly', () => {
  const booking = { properties: { price: 2500 } };
  const commission = { amount: 125, rate: 0.05 };
  const diasporaFee = 50;
  const currency = 'GHS';

  render(<PaymentSummary booking={booking} commission={commission} diasporaFee={diasporaFee} currency={currency} />);

  expect(screen.getByText('Payment Summary')).toBeInTheDocument();
  expect(screen.getByText('Base Price')).toBeInTheDocument();
  expect(screen.getByText('Platform Commission (5%)')).toBeInTheDocument();
  expect(screen.getByText('Diaspora Escrow Guarantee Fee')).toBeInTheDocument();
  expect(screen.getByText('Total')).toBeInTheDocument();
  expect(screen.getByText('Diaspora Escrow Guarantee Fee included for secure cross-border transactions.')).toBeInTheDocument();
});
