import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Monetization from '../Monetization';

jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props} data-testid={`button-${children.toString().toLowerCase().replace(/\s+/g, '-')}`}>{children}</button>);


describe('Monetization Component (Placeholder Actions)', () => {
  it('should render the monetization section with feature cards', () => {
    render(<Monetization />);
    expect(screen.getByText('Grow Your Reach & Trust')).toBeInTheDocument();

    // Check for feature card titles
    expect(screen.getByText('🚀 Boost Listing')).toBeInTheDocument();
    expect(screen.getByText('🔐 Get Verified Landlord Badge')).toBeInTheDocument(); // Updated title
    expect(screen.getByText('💼 Upgrade to Pro Agent')).toBeInTheDocument();

    // Check for action buttons
    expect(screen.getByText('Boost Your Property')).toBeInTheDocument();
    expect(screen.getByText('Start Verification')).toBeInTheDocument();
    expect(screen.getByText('Explore Pro Agent Benefits')).toBeInTheDocument();
  });

  it('should log to console when monetization action buttons are clicked (placeholder behavior)', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Monetization />);

    fireEvent.click(screen.getByText('Boost Your Property'));
    expect(consoleSpy).toHaveBeenCalledWith('Boost Listing clicked - initiate payment flow or show options');

    fireEvent.click(screen.getByText('Start Verification'));
    expect(consoleSpy).toHaveBeenCalledWith('Get Verified Badge clicked - navigate to verification process');

    fireEvent.click(screen.getByText('Explore Pro Agent Benefits'));
    expect(consoleSpy).toHaveBeenCalledWith('Upgrade to Pro Agent clicked - navigate to subscription/payment page');

    consoleSpy.mockRestore();
  });
});
