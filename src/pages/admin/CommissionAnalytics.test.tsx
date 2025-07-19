import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CommissionAnalytics from './CommissionAnalytics';

import CommissionAnalytics from './CommissionAnalytics';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn().mockResolvedValue({ data: [], error: null }),
      })),
    })),
  })),
}));

test('renders commission analytics page correctly', async () => {
  render(<CommissionAnalytics />);

  expect(screen.getByText('Commission Analytics')).toBeInTheDocument();

  // The chart is not rendered in the test environment, so we just check for the title.
});
