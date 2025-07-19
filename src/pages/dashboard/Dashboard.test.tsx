import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders dashboard correctly for admin', () => {
  const user = { role: 'admin' };
  render(<Dashboard user={user} />);

  expect(screen.getByText('Dashboard')).toBeInTheDocument();
  // TODO: Add assertions for admin widgets
});

test('renders dashboard correctly for landlord', () => {
    const user = { role: 'landlord' };
    render(<Dashboard user={user} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    // TODO: Add assertions for landlord widgets
});

test('renders dashboard correctly for renter', () => {
    const user = { role: 'renter' };
    render(<Dashboard user={user} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    // TODO: Add assertions for renter widgets
});

test('renders dashboard correctly for diaspora', () => {
    const user = { role: 'diaspora' };
    render(<Dashboard user={user} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    // TODO: Add assertions for diaspora widgets
});
