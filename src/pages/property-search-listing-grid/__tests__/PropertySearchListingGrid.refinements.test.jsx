import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PropertySearchListingGrid from '../index';

// Mock child components
jest.mock('../components/PropertyCard', () => ({ property }) => <div data-testid="property-card">{property.title}</div>);
jest.mock('../../../components/MapboxView', () => ({ properties }) => <div data-testid="mapbox-view">Map of {properties.length} properties</div>);
jest.mock('../../../components/ui/OfflineState', () => ({ onRetry }) => <div data-testid="offline-state">You are offline.</div>);

// Mock other UI components used directly by the page
jest.mock('../../../components/ui/Header', () => () => <header>Header</header>);
jest.mock('../../../components/ui/PrimaryTabNavigation', () => () => <nav>Primary Nav</nav>);
jest.mock('../components/SearchInput', () => () => <input placeholder="Search" />);
jest.mock('../components/FilterBar', () => () => <div>Filter Bar</div>);
jest.mock('../components/SortDropdown', () => () => <select><option>Sort</option></select>);
jest.mock('../components/MapToggle', () => ({ viewMode, onChange }) => <button onClick={() => onChange(viewMode === 'grid' ? 'map' : 'grid')}>Toggle View</button>);


describe('PropertySearchListingGrid Refinements', () => {
  it('should toggle between grid view and map view', async () => {
    render(<MemoryRouter><PropertySearchListingGrid /></MemoryRouter>);

    // Wait for loading to finish
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument(), { timeout: 2000 });

    // Initially, should be in grid view
    expect(screen.getAllByTestId('property-card').length).toBeGreaterThan(0);
    expect(screen.queryByTestId('mapbox-view')).not.toBeInTheDocument();

    // Click the toggle button (mocked as MapToggle)
    fireEvent.click(screen.getByText('Toggle View'));

    // Should now be in map view
    await waitFor(() => {
        expect(screen.getByTestId('mapbox-view')).toBeInTheDocument();
        expect(screen.getByText('Map of 2 properties')).toBeInTheDocument(); // Based on mock data length
        expect(screen.queryAllByTestId('property-card').length).toBe(0);
    });
  });

  it('should display the offline state component when isOffline is true', async () => {
    // To test this, we need to control the `isOffline` state.
    // We'll mock useState for this specific test.
    const originalUseState = React.useState;
    const setIsOffline = jest.fn();
    // Set the initial state of `isOffline` to true for this test
    jest.spyOn(React, 'useState').mockImplementation((initialValue) => {
        if (initialValue === false && typeof initialValue === 'boolean') { // A bit fragile, but targets the isOffline state
            return [true, setIsOffline];
        }
        return originalUseState(initialValue);
    });

    render(<MemoryRouter><PropertySearchListingGrid /></MemoryRouter>);

    await waitFor(() => {
        expect(screen.getByTestId('offline-state')).toBeInTheDocument();
    });

    jest.spyOn(React, 'useState').mockImplementation(originalUseState); // Restore
  });
});
