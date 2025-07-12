import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Earnings from '../Earnings';

jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);

describe('Earnings Component (Placeholder)', () => {
  it('should render the earnings section with placeholder text and mock summary', () => {
    render(<Earnings />);
    expect(screen.getByText('Earnings & Payouts')).toBeInTheDocument();

    // Check for mock summary data
    expect(screen.getByText('Total Earned (All Time)')).toBeInTheDocument();
    expect(screen.getByText('₦1,250,000')).toBeInTheDocument(); // Based on mockSummary.totalEarned

    // Check for placeholder messages
    expect(screen.getByText('Detailed Earnings Reports Coming Soon!')).toBeInTheDocument();
    expect(screen.getByText('Payout Settings & History')).toBeInTheDocument();
    expect(screen.getByText('Configure Payout Methods (Coming Soon)')).toBeInTheDocument();
  });
});
