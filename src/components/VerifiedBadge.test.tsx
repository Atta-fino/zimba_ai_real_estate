import React from 'react';
import { render, screen } from '@testing-library/react';
import VerifiedBadge from './VerifiedBadge';

test('renders verified badge correctly', () => {
  render(<VerifiedBadge />);

  expect(screen.getByText('Verified')).toBeInTheDocument();
});
