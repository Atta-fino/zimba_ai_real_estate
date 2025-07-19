import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from '../index';

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../components/ui/Input', () => (props) => <input data-testid={`input-${props.name || props.id}`} {...props} onChange={props.onChange || jest.fn()} value={props.value || ''} />);
jest.mock('../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../components/ui/Select', () => ({ children, ...props }) => <select data-testid={`select-${props.name || props.id}`} {...props} onChange={(e) => props.onValueChange(e.target.value)} value={props.value || ''}>{children}</select>);
jest.mock('../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('SignupPage Component', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    // window.alert mock for password mismatch etc.
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render Step 1 (Create Account) by default', () => {
    setup();
    expect(screen.getByText('Create your Zimba Account')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
  });

  it('should progress through steps on valid submission', () => {
    setup();
    // Step 1
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('input-confirmPassword'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Continue'));
    expect(screen.getByText('Your Region & Language')).toBeInTheDocument();

    // Step 2
    fireEvent.change(screen.getByTestId('select-country'), { target: { value: 'KE' } }); // Kenya
    fireEvent.change(screen.getByTestId('select-language'), { target: { value: 'Swahili' } });
    fireEvent.click(screen.getByText('Continue'));
    expect(screen.getByText('How will you be using Zimba?')).toBeInTheDocument();

    // Step 3
    fireEvent.click(screen.getByText('Renter or Buyer')); // Select role
    // setTimeout in component, so wait for next step to appear
    waitFor(() => expect(screen.getByText('Welcome to a Safer Way to Rent & Buy!')).toBeInTheDocument());
  });

  it('should show alert if passwords do not match in Step 1', () => {
    setup();
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('input-confirmPassword'), { target: { value: 'password456' } });
    fireEvent.click(screen.getByText('Continue'));

    expect(window.alert).toHaveBeenCalledWith("Passwords do not match.");
    expect(screen.getByText('Create your Zimba Account')).toBeInTheDocument(); // Still on step 1
  });

  it('should navigate to dashboard on final submission (Step 4)', async () => {
    setup();
    // Quickly fill steps to reach step 4
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('input-confirmPassword'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Continue')); // to step 2

    fireEvent.change(screen.getByTestId('select-country'), { target: { value: 'NG' } });
    fireEvent.click(screen.getByText('Continue')); // to step 3

    // Wait for role selection to settle (due to setTimeout in component)
    await waitFor(() => screen.getByText('Renter or Buyer'));
    fireEvent.click(screen.getByText('Renter or Buyer')); // to step 4

    await waitFor(() => screen.getByText('Complete Signup'));
    fireEvent.click(screen.getByText('Complete Signup'));

    expect(window.alert).toHaveBeenCalledWith("Signup successful! Welcome to Zimba! You will now be redirected to your dashboard. (Simulation)");
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard')); // Default for 'renter' role
  });

  it('should navigate to landlord dashboard if landlord role is selected', async () => {
    setup();
    // Step 1
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'landlord@example.com' } });
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('input-confirmPassword'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Continue'));
    // Step 2
    fireEvent.click(screen.getByText('Continue'));
    // Step 3 - select landlord
    await waitFor(() => screen.getByText('Landlord or Agent'));
    fireEvent.click(screen.getByText('Landlord or Agent'));
    // Step 4
    await waitFor(() => screen.getByText('Complete Signup'));
    fireEvent.click(screen.getByText('Complete Signup'));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/landlord-dashboard'));
  });
});
