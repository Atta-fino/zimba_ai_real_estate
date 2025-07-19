import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom'; // MemoryRouter for useNavigate context
import MyProperties from '../MyProperties';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // import and retain default behavior
  useNavigate: () => mockNavigate, // Mapped to our mock
}));

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../../components/AppImage', () => (props) => <img {...props} data-testid="app-image" />);
jest.mock('../../../../utils/enums', () => ({
  getPropertyTypeDisplay: (key) => `display ${key}`,
}));


describe('MyProperties Component', () => {
  const setup = (props = {}) => {
    render(
      <MemoryRouter>
        <MyProperties {...props} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear(); // Clear mock call history before each test
  });

  it('should render the "My Properties" title and "Add New Property" button', () => {
    setup();
    expect(screen.getByText(/My Properties/)).toBeInTheDocument(); // Match "My Properties (3)" for example
    expect(screen.getByText('Add New Property')).toBeInTheDocument();
  });

  it('should display property cards based on mock data', () => {
    setup();
    // Check for titles of mock properties
    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument();
    expect(screen.getByText('Modern Office Space in Ikeja')).toBeInTheDocument();
    // Check for a property type using the mocked enum helper
    expect(screen.getAllByText('display apartment').length).toBeGreaterThan(0);
  });

  it('should call navigate when "Add New Property" button is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Add New Property'));
    expect(mockNavigate).toHaveBeenCalledWith('/landlord-dashboard/properties/new');
  });

  it('should call navigate when an "Edit" button on a property card is clicked', () => {
    setup();
    // Assuming the first "Edit" button corresponds to 'prop1'
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/landlord-dashboard/properties/edit/prop1');
  });

  it('should display an empty state if no properties are present', () => {
    // Temporarily mock useState to return an empty array for properties
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], jest.fn()]);
    setup();
    expect(screen.getByText('No Properties Yet')).toBeInTheDocument();
    expect(screen.getByText('Add Your First Property')).toBeInTheDocument();
    jest.spyOn(React, 'useState').mockImplementation(originalUseState); // Restore original
  });
});
