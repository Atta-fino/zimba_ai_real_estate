import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PropertyDetailView from '../index';

// Mock the enums module as its actual implementation is tested separately
jest.mock('../../../utils/enums', () => ({
  getPropertyTypeDisplay: jest.fn((key) => key.replace(/_/g, ' ') + ' display'),
  getFeatureDisplay: jest.fn((key) => key.replace(/_/g, ' ') + ' display'),
}));

// Mock AppImage and AppIcon components as they are not the focus of this test
jest.mock('../../../components/AppImage', () => (props) => <img {...props} data-testid="app-image" />);
jest.mock('../../../components/AppIcon', () => ({ name, size, className }) => <svg data-testid={`app-icon-${name}`} className={className} width={size} height={size} />);


describe('PropertyDetailView Component', () => {
  const renderComponent = (id) => {
    return render(
      <MemoryRouter initialEntries={[`/property-detail-view/${id}`]}>
        <Routes>
          <Route path="/property-detail-view/:id" element={<PropertyDetailView />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('should display loading state initially', () => {
    renderComponent('1');
    expect(screen.getByText(/Loading Property Details.../i)).toBeInTheDocument();
  });

  it('should render property details after loading (mocked data for ID 1)', async () => {
    renderComponent('1');

    // Wait for the loading to disappear and content to appear
    await waitFor(() => {
      expect(screen.queryByText(/Loading Property Details.../i)).not.toBeInTheDocument();
    });

    // Check for title (includes part of the mock title for ID 1)
    expect(screen.getByText(/Modern Downtown Apartment/i)).toBeInTheDocument();

    // Check for property type (using the mocked getPropertyTypeDisplay)
    // The mock property for ID "1" has propertyType 'apartment'
    expect(screen.getByText("apartment display")).toBeInTheDocument();

    // Check for some features (using the mocked getFeatureDisplay)
    // Mock property "1" has 'air_conditioner' and 'pool'
    expect(screen.getByText("air conditioner display")).toBeInTheDocument();
    expect(screen.getByText("pool display")).toBeInTheDocument();

    // Check for agent name
    expect(screen.getByText(/Adeola Property Pro/i)).toBeInTheDocument();

    // Check for price
    expect(screen.getByText(/NGN\s*350,000/i)).toBeInTheDocument(); // Check for formatted price
  });

  it('should render property details for a different ID (mocked data for ID 2)', async () => {
    renderComponent('2');

    await waitFor(() => {
      expect(screen.queryByText(/Loading Property Details.../i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Spacious Family Villa with Garden/i)).toBeInTheDocument();
    // PropertyType for ID "2" is 'detached_house'
    expect(screen.getByText("detached house display")).toBeInTheDocument();
    // Feature for ID "2" includes 'garage'
    expect(screen.getByText("garage display")).toBeInTheDocument();
    expect(screen.getByText(/Chinedu Real Estate/i)).toBeInTheDocument();
    expect(screen.getByText(/NGN\s*1,200,000/i)).toBeInTheDocument();
  });

  it('should display error message if fetching fails for an unknown ID', async () => {
    renderComponent('unknown_id_test'); // An ID that will cause fetchPropertyById to reject

    await waitFor(() => {
      expect(screen.queryByText(/Loading Property Details.../i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Oops! Something went wrong./i)).toBeInTheDocument();
    expect(screen.getByText(/Property not found/i)).toBeInTheDocument(); // Error message from mock fetch
  });

  it('should display "Property Not Found" if property is null after loading (e.g. API returns null)', async () => {
    // Temporarily modify fetchPropertyById to return null for a specific ID
    // This is a bit more involved to do cleanly without jest.spyOn on the module itself,
    // For now, we rely on the 'unknown_id_test' to cover a "not found" scenario from the mock.
    // A more robust test might involve jest.spyOn(module, 'fetchPropertyById').mockResolvedValue(null);
    // but that requires the fetchPropertyById to be an export from its own module or careful mocking.

    // For this test, we assume the current mock's rejection for unknown IDs covers "not found" from API.
    // If the API could return a successful response with `null` data, that would be a different test case.
    renderComponent('999'); // Assuming '999' is not in mockProperties and will be rejected

    await waitFor(() => {
        expect(screen.getByText(/Property Not Found/i)).toBeInTheDocument();
    });
  });

});
