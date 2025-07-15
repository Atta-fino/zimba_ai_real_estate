import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserManagement from '../UserManagement';

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/ui/Input', () => (props) => <input data-testid={`input-${props.name || props.id}`} {...props} onChange={props.onChange || jest.fn()} />);
jest.mock('../../../../components/ui/Select', () => ({ children, ...props }) => <select data-testid={`select-${props.name || props.id}`} {...props} onChange={(e) => props.onValueChange(e.target.value)}>{children}</select>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);


describe('UserManagement Panel Component', () => {
  const setup = () => {
    render(<UserManagement />);
  };

  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the panel title, filters, and user table', () => {
    setup();
    expect(screen.getByText('User Management')).toBeInTheDocument();

    // Filters
    expect(screen.getByPlaceholderText('Search by name or email...')).toBeInTheDocument();
    expect(screen.getByTestId('select-role')).toBeInTheDocument();

    // Table Headers
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Mock Data
    expect(screen.getByText('Aisha Bello')).toBeInTheDocument();
    expect(screen.getByText('chidinma.o@example.com')).toBeInTheDocument();
  });

  it('should filter users by role', () => {
    setup();
    const roleSelect = screen.getByTestId('select-role');

    expect(screen.getByText('Aisha Bello')).toBeInTheDocument(); // landlord
    expect(screen.getByText('Chidinma Okoro')).toBeInTheDocument(); // renter

    fireEvent.change(roleSelect, { target: { value: 'landlord' } });

    expect(screen.getByText('Aisha Bello')).toBeInTheDocument();
    expect(screen.queryByText('Chidinma Okoro')).not.toBeInTheDocument();
  });

  it('should filter users by search term', () => {
    setup();
    const searchInput = screen.getByPlaceholderText('Search by name or email...');

    expect(screen.getByText('Aisha Bello')).toBeInTheDocument();
    expect(screen.getByText('David Chen')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'david' } });

    expect(screen.queryByText('Aisha Bello')).not.toBeInTheDocument();
    expect(screen.getByText('David Chen')).toBeInTheDocument();
  });

  it('should call alert on placeholder action click', () => {
    setup();
    const suspendButtons = screen.getAllByTitle('Suspend User');
    fireEvent.click(suspendButtons[0]);
    expect(window.alert).toHaveBeenCalledWith("Action: 'suspend' triggered for User ID: landlord_A (Simulation)");
  });
});
