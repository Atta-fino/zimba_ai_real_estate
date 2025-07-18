import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsManagement from './SettingsManagement';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn().mockResolvedValue({ data: [{key: 'rent_commission_rate', value: {value: '0.05'}}], error: null }),
      update: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ error: null }),
      })),
    })),
  })),
}));

test('renders settings management page correctly', () => {
  render(<SettingsManagement />);

  expect(screen.getByText('Settings Management')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Save'));
});
