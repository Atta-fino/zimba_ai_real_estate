import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReportListing from './ReportListing';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    })),
  })),
}));

test('renders report listing button', () => {
  global.alert = jest.fn();
  render(<ReportListing propertyId="123" userId="456" />);

  expect(screen.getByText('Report Listing')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Report Listing'));
});
