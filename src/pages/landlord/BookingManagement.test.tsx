import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingManagement from './BookingManagement';

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

test('renders booking management page correctly', () => {
  render(<BookingManagement userId="123" />);

  expect(screen.getByText('Booking Management')).toBeInTheDocument();
});
