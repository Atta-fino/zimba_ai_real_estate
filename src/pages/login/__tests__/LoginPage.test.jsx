import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../index';

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../components/ui/Input', () => (props) => <input data-testid={`input-${props.name || props.id}`} {...props} onChange={props.onChange || jest.fn()} value={props.value || ''} />);
jest.mock('../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
// jest.mock('../../../components/ui/Checkbox', ...); // If "Remember Me" was active

describe('LoginPage Component', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the login form', () => {
    setup();
    expect(screen.getByText('Welcome Back to Zimba!')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByText(/Sign Up for Zimba/i)).toBeInTheDocument();
  });

  it('should update form fields on change', () => {
    setup();
    const emailInput = screen.getByTestId('input-email');
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    expect(emailInput).toHaveValue('user@example.com');
  });

  it('should simulate successful login and navigate to dashboard', async () => {
    setup();
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Log In'));

    expect(screen.getByText('Log In').closest('button')).toBeDisabled(); // Or check for loading icon

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Login successful! Welcome back to Zimba! (Simulation)");
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard'); // Default mock role is 'renter'
    });
  });

  it('should display error message on failed login', async () => {
    setup();
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password. Please try again or reset your password.')).toBeInTheDocument();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should have a link to the signup page', () => {
    setup();
    const signupLink = screen.getByText(/Sign Up for Zimba/i);
    expect(signupLink).toHaveAttribute('href', '/signup');
  });
});
