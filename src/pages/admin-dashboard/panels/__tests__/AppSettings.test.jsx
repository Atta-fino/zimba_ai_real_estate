import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppSettings from '../AppSettings';

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/ui/Input', () => (props) => <input data-testid={`input-${props.name || props.id}`} {...props} onChange={props.onChange || jest.fn()} />);
jest.mock('../../../../components/ui/Checkbox', () => (props) => <input type="checkbox" data-testid={`checkbox-${props.name || props.id}`} {...props} onChange={(e) => props.onCheckedChange(e.target.checked)} />);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('AppSettings Panel Component', () => {
  const setup = () => {
    render(<AppSettings />);
  };

  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the settings panel with commission and maintenance mode sections', () => {
    setup();
    expect(screen.getByText('Application Settings')).toBeInTheDocument();

    // Commission settings
    expect(screen.getByText('Commission & Fee Rates')).toBeInTheDocument();
    expect(screen.getByLabelText('Rent Commission Rate')).toBeInTheDocument();
    expect(screen.getByLabelText('Property Sale Commission Rate')).toBeInTheDocument();

    // Maintenance mode
    expect(screen.getByText('Maintenance Mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Zimba Is Live')).toBeInTheDocument();
  });

  it('should update a setting value on change', () => {
    setup();
    const rentRateInput = screen.getByLabelText('Rent Commission Rate');
    expect(rentRateInput).toHaveValue(0.05);
    fireEvent.change(rentRateInput, { target: { value: '0.07' } });
    expect(rentRateInput).toHaveValue(0.07);
  });

  it('should simulate saving all settings', async () => {
    setup();
    fireEvent.click(screen.getByText('Save All Settings'));

    expect(screen.getByText('Save All Settings').closest('button')).toBeDisabled();

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Settings updated successfully! (Simulation)");
    });

     expect(screen.getByText('Save All Settings').closest('button')).not.toBeDisabled();
  });
});
