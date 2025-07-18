import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertySearchListingGrid from './index';

// Mock Mapbox GL
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
}));

test('renders map correctly', () => {
  render(<PropertySearchListingGrid />);

  fireEvent.click(screen.getByText('Map'));

  expect(screen.getByRole('application')).toBeInTheDocument();
});

test('renders popups correctly', () => {
    render(<PropertySearchListingGrid />);

    fireEvent.click(screen.getByText('Map'));

    const markers = screen.getAllByRole('button', { name: '' });
    fireEvent.click(markers[0]);

    expect(screen.getByText('Modern 2-Bedroom Apartment')).toBeInTheDocument();
});
