import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrencyConverter from '../CurrencyConverter';

// Mock UI components
jest.mock('../../AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../Input', () => (props) => <input data-testid={`input-${props.id}`} {...props} />);

describe('CurrencyConverter Component', () => {
  it('should render with initial default values and perform conversion', () => {
    render(<CurrencyConverter />);

    expect(screen.getByText('Quick Currency Converter')).toBeInTheDocument();

    // Check initial values (150,000 NGN -> 100 USD @ 1500 rate)
    const localInput = screen.getByTestId('input-localCurrency');
    const foreignInput = screen.getByTestId('input-foreignCurrency');

    expect(localInput).toHaveValue('150,000');
    expect(foreignInput).toHaveValue('100.00');
  });

  it('should update local amount when foreign amount is changed', () => {
    render(<CurrencyConverter />);
    const foreignInput = screen.getByTestId('input-foreignCurrency');

    fireEvent.change(foreignInput, { target: { value: '200' } });

    expect(screen.getByTestId('input-localCurrency')).toHaveValue('300,000.00'); // 200 * 1500
  });

  it('should update foreign amount when local amount is changed', () => {
    render(<CurrencyConverter />);
    const localInput = screen.getByTestId('input-localCurrency');

    // Note: The component formats the local value with commas. The test needs to handle this.
    // The component's handleLocalChange strips commas before calculating.
    fireEvent.change(localInput, { target: { value: '450,000' } });

    expect(screen.getByTestId('input-foreignCurrency')).toHaveValue('300.00'); // 450000 / 1500
  });

  it('should display the disclaimer with the correct rate', () => {
    render(<CurrencyConverter mockRate={1600} />);
    expect(screen.getByText(/Current rate: 1 USD ≈ 1600 NGN/i)).toBeInTheDocument();
  });
});
