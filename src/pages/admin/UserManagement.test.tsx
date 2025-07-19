import React from 'react';
import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
    })),
  })),
}));

test('renders user management page correctly', () => {
  render(<UserManagement />);

  expect(screen.getByText('User Management')).toBeInTheDocument();
});
