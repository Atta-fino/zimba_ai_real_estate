import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapboxView from '../MapboxView';

jest.mock('../AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('MapboxView Placeholder Component', () => {
  it('should render the map placeholder with a message', () => {
    render(<MapboxView properties={[{id: 1}, {id: 2}]} />);

    expect(screen.getByText('Interactive Map View')).toBeInTheDocument();
    expect(screen.getByAltText('Map view of properties')).toBeInTheDocument();
    expect(screen.getByText(/2 listed properties would appear/i)).toBeInTheDocument();
    expect(screen.getByText('(Live map integration is disabled in this environment.)')).toBeInTheDocument();
  });
});
