import React from 'react';
import { render, screen } from '@testing-library/react';
import LegalGuides from './LegalGuides';

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

test('renders legal guides page correctly', () => {
  render(<LegalGuides countryCode="GH" />);

  expect(screen.getByText('Legal Guides')).toBeInTheDocument();
});
