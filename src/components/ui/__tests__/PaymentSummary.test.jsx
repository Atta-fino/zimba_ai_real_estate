import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaymentSummary from '../PaymentSummary';

jest.mock('../../AppIcon', () => ({ name, size, className }) => <svg data-testid={`icon-${name}`} className={className} width={size} height={size} />);

describe('PaymentSummary Component', () => {
  const defaultProps = {
    basePrice: 2500,
    commissionRate: 0.05, // 5%
    currency: 'NGN',
  };

  it('should render correctly with base price and platform commission', () => {
    render(<PaymentSummary {...defaultProps} />);

    expect(screen.getByText('Payment Summary')).toBeInTheDocument();
    expect(screen.getByText('Base Rent Amount')).toBeInTheDocument(); // Default transactionType is 'rent'
    expect(screen.getByText('₦2,500.00')).toBeInTheDocument(); // Base price

    expect(screen.getByText('Zimba Platform Fee (5.0%)')).toBeInTheDocument();
    expect(screen.getByText('₦125.00')).toBeInTheDocument(); // Commission: 2500 * 0.05

    expect(screen.getByText('Total Amount Due')).toBeInTheDocument();
    expect(screen.getByText('₦2,625.00')).toBeInTheDocument(); // Total: 2500 + 125

    expect(screen.queryByText(/Diaspora Escrow Guarantee/i)).not.toBeInTheDocument();
  });

  it('should display property sale price label if transactionType is "sale"', () => {
    render(<PaymentSummary {...defaultProps} transactionType="sale" />);
    expect(screen.getByText('Property Sale Price')).toBeInTheDocument();
  });

  it('should include Diaspora Escrow Guarantee Fee if isDiasporaTransaction is true', () => {
    render(
      <PaymentSummary
        {...defaultProps}
        isDiasporaTransaction={true}
        diasporaFeeRate={0.02} // 2%
      />
    );

    expect(screen.getByText('Base Rent Amount')).toBeInTheDocument();
    expect(screen.getByText('₦2,500.00')).toBeInTheDocument();

    expect(screen.getByText('Zimba Platform Fee (5.0%)')).toBeInTheDocument();
    expect(screen.getByText('₦125.00')).toBeInTheDocument();

    expect(screen.getByText(/Diaspora Escrow Guarantee \(2.0%\)/i)).toBeInTheDocument();
    expect(screen.getByText('₦50.00')).toBeInTheDocument(); // Diaspora fee: 2500 * 0.02

    expect(screen.getByText('Total Amount Due')).toBeInTheDocument();
    expect(screen.getByText('₦2,675.00')).toBeInTheDocument(); // Total: 2500 + 125 + 50

    expect(screen.getByText(/For your peace of mind, a small Diaspora Escrow Guarantee Fee is included./i)).toBeInTheDocument();
  });

  it('should handle zero commission rate', () => {
    render(<PaymentSummary {...defaultProps} commissionRate={0} />);
    expect(screen.getByText('Zimba Platform Fee (0.0%)')).toBeInTheDocument();
    expect(screen.getByText('₦0.00')).toBeInTheDocument(); // Commission
    expect(screen.getByText('₦2,500.00')).toBeInTheDocument(); // Total should be base price
  });

  it('should render error message for invalid basePrice', () => {
    render(<PaymentSummary {...defaultProps} basePrice={-100} />);
    expect(screen.getByText('Error: Invalid base price provided.')).toBeInTheDocument();
  });

  it('should render error message for invalid commissionRate', () => {
    render(<PaymentSummary {...defaultProps} commissionRate={1.5} />);
    expect(screen.getByText('Error: Invalid commission rate provided.')).toBeInTheDocument();
  });
});
