import React from 'react';
import { render, screen } from '@testing-library/react';
import FlexPay from './FlexPay';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: [], error: null }),
      })),
    })),
  })),
}));

test('renders flexpay page correctly', () => {
  render(<FlexPay bookingId="123" />);

  expect(screen.getByText('FlexPay')).toBeInTheDocument();
});
