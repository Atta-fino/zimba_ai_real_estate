import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FindAgent from './FindAgent';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          textSearch: jest.fn().mockResolvedValue({ data: [], error: null }),
        })),
      })),
    })),
  })),
}));

test('renders find agent correctly', () => {
  render(<FindAgent />);

  expect(screen.getByText('Find a Local Agent')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Search'));
});
