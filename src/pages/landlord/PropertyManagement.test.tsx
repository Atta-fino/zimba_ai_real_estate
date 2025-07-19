import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyManagement from './PropertyManagement';

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

test('renders property management page correctly', () => {
  render(<PropertyManagement userId="123" />);

  expect(screen.getByText('Property Management')).toBeInTheDocument();
});
