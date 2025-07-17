import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Withdrawals from './Withdrawals';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: [], error: null }),
      })),
    })),
    functions: jest.fn(() => ({
        invoke: jest.fn().mockResolvedValue({ data: null, error: null })
    }))
  })),
}));

test('renders withdrawals page correctly', async () => {
  render(<Withdrawals agentId="123" />);

  expect(screen.getByText('Withdrawals')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Request Withdrawal')).toBeInTheDocument();
  })
});
