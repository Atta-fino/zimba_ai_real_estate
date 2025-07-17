import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CommissionsOverview from './CommissionsOverview';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
    })),
  })),
}));

test('renders commissions overview correctly', async () => {
  render(<CommissionsOverview />);

  expect(screen.getByText('Commissions Overview')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Export to CSV')).toBeInTheDocument();
  })
});
