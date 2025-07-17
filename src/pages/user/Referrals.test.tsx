import React from 'react';
import { render, screen } from '@testing-library/react';
import Referrals from './Referrals';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: [], error: null }),
      })),
    })),
    functions: {
      invoke: jest.fn().mockResolvedValue({ data: null, error: null }),
    },
  })),
}));

test('renders referrals page correctly', () => {
  render(<Referrals userId="123" />);

  expect(screen.getByText('Referrals')).toBeInTheDocument();
});
