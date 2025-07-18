import React from 'react';
import { render, screen } from '@testing-library/react';
import SavedProperties from './SavedProperties';

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

test('renders saved properties page correctly', () => {
  render(<SavedProperties userId="123" />);

  expect(screen.getByText('Saved Properties')).toBeInTheDocument();
});
