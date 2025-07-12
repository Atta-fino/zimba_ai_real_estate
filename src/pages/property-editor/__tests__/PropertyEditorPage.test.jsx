import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PropertyEditorPage from '../index';

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: jest.fn(), // Will be mocked per test case for add/edit
}));

jest.mock('../../../components/ui/Input', () => (props) => <input data-testid={`input-${props.name || props.id}`} {...props} onChange={props.onChange || jest.fn()} />);
jest.mock('../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../components/ui/Select', () => ({ children, ...props }) => <select data-testid={`select-${props.name || props.id}`} {...props} onChange={(e) => props.onValueChange(e.target.value)}>{children}</select>);
jest.mock('../../../components/ui/Checkbox', () => (props) => <input type="checkbox" data-testid={`checkbox-${props.value}`} {...props} onChange={(e) => props.onCheckedChange(e.target.checked)} />);
jest.mock('../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../components/AppImage', () => (props) => <img {...props} data-testid="app-image" />);

jest.mock('../../../utils/enums', () => ({
  PropertyType: {
    apartment: "Apartment",
    detached_house: "Detached House",
  },
  Feature: {
    air_conditioner: "Air Conditioner",
    pool: "Pool",
  },
  getPropertyTypeDisplay: (key) => `display ${key}`,
  getFeatureDisplay: (key) => `display ${key}`,
}));

// Mock the fetchPropertyForEdit function from the module
// This is a bit tricky since it's defined in the same file.
// For a cleaner test, fetchPropertyForEdit would be in its own utils file.
// As a workaround for this structure, we'd typically refactor.
// For now, we'll rely on useParams to differentiate behavior or test its effects.


describe('PropertyEditorPage Component', () => {
  const renderEditor = (propertyId = null) => {
    jest.requireMock('react-router-dom').useParams.mockReturnValue({ propertyId });
    render(
      <MemoryRouter initialEntries={propertyId ? [`/landlord-dashboard/properties/edit/${propertyId}`] : ['/landlord-dashboard/properties/new']}>
        <Routes>
          <Route path="/landlord-dashboard/properties/new" element={<PropertyEditorPage />} />
          <Route path="/landlord-dashboard/properties/edit/:propertyId" element={<PropertyEditorPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    // Clear any persistent state in the module if necessary (e.g., if mockFetch was a spy on a module export)
  });

  describe('Add New Property Mode', () => {
    it('should render the form for adding a new property', () => {
      renderEditor();
      expect(screen.getByText('Add New Property')).toBeInTheDocument();
      expect(screen.getByTestId('input-title')).toHaveValue('');
      expect(screen.getByTestId('select-propertyType')).toBeInTheDocument();
      // Check for a feature checkbox
      expect(screen.getByTestId('checkbox-air_conditioner')).toBeInTheDocument();
      expect(screen.getByText('Add Property')).toBeInTheDocument();
    });

    it('should update form fields on change', () => {
      renderEditor();
      const titleInput = screen.getByTestId('input-title');
      fireEvent.change(titleInput, { target: { value: 'Test Property Title' } });
      expect(titleInput).toHaveValue('Test Property Title');

      const propertyTypeSelect = screen.getByTestId('select-propertyType');
      fireEvent.change(propertyTypeSelect, { target: { value: 'detached_house' } });
      expect(propertyTypeSelect).toHaveValue('detached_house');

      const acCheckbox = screen.getByTestId('checkbox-air_conditioner');
      fireEvent.click(acCheckbox); // Check it
      expect(acCheckbox).toBeChecked();
    });

    it('should navigate on successful submission for new property', async () => {
      renderEditor();
      fireEvent.change(screen.getByTestId('input-title'), { target: { value: 'Test Title' } });
      fireEvent.change(screen.getByTestId('input-location'), { target: { value: 'Test Location' } });
      fireEvent.change(screen.getByTestId('input-price'), { target: { value: '100000' } });
      fireEvent.change(screen.getByTestId('select-propertyType'), { target: { value: 'apartment' } });

      fireEvent.click(screen.getByText('Add Property'));

      expect(screen.getByText('Saving...')).toBeInTheDocument();

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/landlord-dashboard?tab=my-properties');
      });
    });
  });

  describe('Edit Property Mode', () => {
    // To properly test edit mode, we need to ensure `fetchPropertyForEdit` is effectively mocked
    // or the component uses a prop for initial data. Given the current structure,
    // we assume the useEffect and fetchPropertyForEdit (even if simplified) will populate the form.
    // A console.log inside fetchPropertyForEdit in the component confirms it's called.

    it('should render the form for editing an existing property and pre-fill data', async () => {
      // This test assumes fetchPropertyForEdit (inside the component) will return mock data for 'prop1'
      renderEditor('prop1');

      // Loading state for fetching data
      expect(screen.getByText('Loading property data...')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Edit Property')).toBeInTheDocument();
      });

      // Check if form fields are populated (values from mockExistingProperties for 'prop1')
      await waitFor(() => {
        expect(screen.getByTestId('input-title')).toHaveValue('Spacious 3-Bedroom Apartment in Lekki');
        expect(screen.getByTestId('select-propertyType')).toHaveValue('apartment');
        expect(screen.getByTestId('checkbox-air_conditioner')).toBeChecked();
      });
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });

    it('should navigate on successful submission for edited property', async () => {
      renderEditor('prop1');

      await waitFor(() => {
        expect(screen.getByTestId('input-title')).toHaveValue('Spacious 3-Bedroom Apartment in Lekki');
      });

      fireEvent.change(screen.getByTestId('input-title'), { target: { value: 'Updated Title' } });
      fireEvent.click(screen.getByText('Save Changes'));

      expect(screen.getByText('Saving...')).toBeInTheDocument();

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/landlord-dashboard?tab=my-properties');
      });
    });
  });
});
