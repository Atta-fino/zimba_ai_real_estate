import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // If any <Link> components are used internally
import CommissionTracker from '../CommissionTracker';

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('CommissionTracker Component (Refined)', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <CommissionTracker />
      </MemoryRouter>
    );
  };

  it('should render the commissions overview title and summary cards', () => {
    setup();
    expect(screen.getByText('Commissions Overview')).toBeInTheDocument();

    // Check for summary card titles
    expect(screen.getByText('Platform Earnings (All Time)')).toBeInTheDocument();
    expect(screen.getByText('Agent Commissions (All Time)')).toBeInTheDocument();

    // Check for calculated mock totals (example values, actual values depend on mockCommissions data)
    // Platform: 250000 + 125000 = 375000
    // Agent: 1500000
    expect(screen.getByText('₦375,000.00')).toBeInTheDocument(); // Total Platform Earnings
    expect(screen.getByText('₦1,500,000.00')).toBeInTheDocument(); // Total Agent Commissions
  });

  it('should display a table with recent commission records', () => {
    setup();
    expect(screen.getByText('Recent Commission Records')).toBeInTheDocument();

    // Check for table headers
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Property / Booking ID')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Source')).toBeInTheDocument();

    // Check for some data from mockCommissions
    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument();
    expect(screen.getByText('Platform Fee')).toBeInTheDocument();
    expect(screen.getByText(/Agent: agent_user_123/i)).toBeInTheDocument(); // Partial match for agent ID
    expect(screen.getAllByText('Rent').length).toBeGreaterThan(0); // Check for 'Rent' type badge
    expect(screen.getByText('Sale')).toBeInTheDocument(); // Check for 'Sale' type badge
  });

  it('should display referral program information', () => {
    setup();
    expect(screen.getByText('Zimba Referral Program')).toBeInTheDocument();
    expect(screen.getByText(/Invite friends to Zimba and earn rewards!/i)).toBeInTheDocument();
  });

  it('should display an empty state if no commissions are present', () => {
    const originalUseState = React.useState;
    // Ensure we're mocking the useState call within CommissionTracker.jsx that handles the 'commissions' state.
    // This might require knowing the order of useState calls if there are multiple.
    // A more robust way would be to pass commissions as a prop and test that way.
    // For this example, assuming it's the first useState for 'commissions'.
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], jest.fn()]);
    render(
        <MemoryRouter>
          <CommissionTracker />
        </MemoryRouter>
      );
    expect(screen.getByText('No commission records found.')).toBeInTheDocument();
    jest.spyOn(React, 'useState').mockImplementation(originalUseState); // Restore original
  });
});
