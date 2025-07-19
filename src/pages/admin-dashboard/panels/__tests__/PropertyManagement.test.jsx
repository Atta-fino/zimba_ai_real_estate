import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PropertyManagement from '../PropertyManagement';

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/ui/Input', () => (props) => <input data-testid={`input-${props.name || props.id}`} {...props} onChange={props.onChange || jest.fn()} />);
jest.mock('../../../../components/ui/Select', () => ({ children, ...props }) => <select data-testid={`select-${props.name || props.id}`} {...props} onChange={(e) => props.onValueChange(e.target.value)}>{children}</select>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('PropertyManagement Panel Component', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <PropertyManagement />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the panel title, filters, and properties table', () => {
    setup();
    expect(screen.getByText('Property Management')).toBeInTheDocument();

    // Filters
    expect(screen.getByPlaceholderText('Search by Title, ID, or Landlord...')).toBeInTheDocument();
    expect(screen.getByTestId('select-status')).toBeInTheDocument();

    // Table Headers and mock data
    expect(screen.getByText('Property Title / ID')).toBeInTheDocument();
    expect(screen.getByText('Landlord')).toBeInTheDocument();
    expect(screen.getByText('Modern Office Space in Ikeja')).toBeInTheDocument();
    expect(screen.getByText('Aisha Bello')).toBeInTheDocument();
  });

  it('should filter properties by status', () => {
    setup();
    const statusSelect = screen.getByTestId('select-status');

    expect(screen.getByText('Modern Office Space in Ikeja')).toBeInTheDocument(); // inactive
    expect(screen.getByText('Too Good To Be True Deal')).toBeInTheDocument(); // hidden

    fireEvent.change(statusSelect, { target: { value: 'hidden' } });

    expect(screen.queryByText('Modern Office Space in Ikeja')).not.toBeInTheDocument();
    expect(screen.getByText('Too Good To Be True Deal')).toBeInTheDocument();
  });

  it('should filter properties by search term', () => {
    setup();
    const searchInput = screen.getByPlaceholderText('Search by Title, ID, or Landlord...');

    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument();
    expect(screen.getByText('Modern Office Space in Ikeja')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'lekki' } });

    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument();
    expect(screen.queryByText('Modern Office Space in Ikeja')).not.toBeInTheDocument();
  });

  it('should have a link to the property detail page', () => {
    setup();
    const propertyLink = screen.getByText('Spacious 3-Bedroom Apartment in Lekki');
    expect(propertyLink).toHaveAttribute('href', '/property-detail-view/prop1');
  });
});
