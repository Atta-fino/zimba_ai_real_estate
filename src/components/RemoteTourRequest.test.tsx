import React from 'react';
import { render, screen } from '@testing-library/react';
import RemoteTourRequest from './RemoteTourRequest';

test('renders remote tour request button', () => {
  render(<RemoteTourRequest propertyId="123" />);

  expect(screen.getByText('Request Remote Tour')).toBeInTheDocument();
});
