import React from 'react';
import { render, screen } from '@testing-library/react';
import BiometricVerification from './BiometricVerification';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    functions: {
      invoke: jest.fn().mockResolvedValue({ data: null, error: null }),
    },
  })),
}));

test('renders biometric verification page correctly', () => {
  render(<BiometricVerification userId="123" />);

  expect(screen.getByText('Biometric Verification')).toBeInTheDocument();
});
