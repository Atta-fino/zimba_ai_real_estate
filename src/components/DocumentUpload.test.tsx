import React from 'react';
import { render, screen } from '@testing-library/react';
import DocumentUpload from './DocumentUpload';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn().mockResolvedValue({ data: {}, error: null }),
      })),
    },
  })),
}));

test('renders document upload correctly', () => {
  render(<DocumentUpload userId="123" />);

  expect(screen.getByText('Document Upload')).toBeInTheDocument();
});
