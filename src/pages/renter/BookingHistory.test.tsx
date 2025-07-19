import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingHistory from './BookingHistory';

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

test('renders booking history page correctly', () => {
  render(<BookingHistory userId="123" />);

  expect(screen.getByText('Booking History')).toBeInTheDocument();
});
