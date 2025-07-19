import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CommissionsOverview from '../CommissionsOverview';

// Mock UI Components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/ui/Input', () => (props) => <input data-testid={`input-${props.name || props.id}`} {...props} onChange={props.onChange || jest.fn()} />);
jest.mock('../../../../components/ui/Select', () => ({ children, ...props }) => <select data-testid={`select-${props.name || props.id}`} {...props} onChange={(e) => props.onValueChange(e.target.value)}>{children}</select>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('CommissionsOverview Admin Panel Component', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <CommissionsOverview />
      </MemoryRouter>
    );
  };

  it('should render the main title, summary stats, and filter section', () => {
    setup();
    expect(screen.getByText('Commissions Overview')).toBeInTheDocument();

    // Summary Stats
    expect(screen.getByText('Total Commissions (Filtered)')).toBeInTheDocument();
    expect(screen.getByText('Platform Share (Filtered)')).toBeInTheDocument();
    expect(screen.getByText('Agent Earnings (Filtered)')).toBeInTheDocument();
    expect(screen.getByText('Total Records (Filtered)')).toBeInTheDocument();

    // Filters
    expect(screen.getByText('Filter Commissions')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Agent ID')).toBeInTheDocument();
  });

  it('should display a table with commission records', () => {
    setup();
    // Table Headers
    expect(screen.getByText('Timestamp')).toBeInTheDocument();
    expect(screen.getByText('Booking ID')).toBeInTheDocument();
    // expect(screen.getByText('Property')).toBeInTheDocument(); // This was in the table header, let's check one
    // The column header is 'Property', the content is the property name.
    const propertyHeader = screen.getAllByText((content, element) => {
      return element.tagName.toLowerCase() === 'th' && content === 'Property';
    });
    expect(propertyHeader.length).toBeGreaterThan(0);


    // Mock data check - check for a property name
    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument();
    // Check for an agent ID or platform
    expect(screen.getByText('N/A (Platform)')).toBeInTheDocument();
    expect(screen.getByText(/agent_user_123/i)).toBeInTheDocument();
  });

  it('should filter commissions by type (rent/sale)', () => {
    setup();
    const typeSelect = screen.getByTestId('select-type');

    // Initial: Check if both rent and sale types are present from mock data
    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument(); // rent
    expect(screen.getByText('Luxury Villa Sale in Banana Island')).toBeInTheDocument(); // sale

    // Filter by 'rent'
    fireEvent.change(typeSelect, { target: { value: 'rent' } });
    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument();
    expect(screen.queryByText('Luxury Villa Sale in Banana Island')).not.toBeInTheDocument();

    // Filter by 'sale'
    fireEvent.change(typeSelect, { target: { value: 'sale' } });
    expect(screen.queryByText('Spacious 3-Bedroom Apartment in Lekki')).not.toBeInTheDocument();
    expect(screen.getByText('Luxury Villa Sale in Banana Island')).toBeInTheDocument();
  });

  it('should render action buttons like Export CSV', () => {
    setup();
    expect(screen.getByText(/Export as CSV/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage Agent Payouts/i)).toBeInTheDocument();
  });
});
