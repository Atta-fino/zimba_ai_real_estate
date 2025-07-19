import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountSecurity from '../AccountSecurity';

jest.mock('../../../../components/ui/Input', () => (props) => <input {...props} data-testid={`input-${props.name || props.id}`} />);
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('AccountSecurity Component', () => {
  it('should render the change password form and 2FA section', () => {
    render(<AccountSecurity />);
    expect(screen.getByText('Account Security')).toBeInTheDocument();
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByTestId('input-currentPassword')).toBeInTheDocument();
    expect(screen.getByTestId('input-newPassword')).toBeInTheDocument();
    expect(screen.getByTestId('input-confirmNewPassword')).toBeInTheDocument();
    expect(screen.getByText('Update Password')).toBeInTheDocument();

    expect(screen.getByText('Two-Factor Authentication (2FA)')).toBeInTheDocument();
    expect(screen.getByText('Configure 2FA')).toBeInTheDocument(); // Button for 2FA
  });

  it('should show error if new passwords do not match', async () => {
    render(<AccountSecurity />);
    fireEvent.change(screen.getByTestId('input-currentPassword'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('input-newPassword'), { target: { value: 'newPass1' } });
    fireEvent.change(screen.getByTestId('input-confirmNewPassword'), { target: { value: 'newPass2' } });
    fireEvent.click(screen.getByText('Update Password'));

    await waitFor(() => {
      expect(screen.getByText('New passwords do not match.')).toBeInTheDocument();
    });
  });

  it('should show error if new password is too short', async () => {
    render(<AccountSecurity />);
    fireEvent.change(screen.getByTestId('input-currentPassword'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('input-newPassword'), { target: { value: 'short' } });
    fireEvent.change(screen.getByTestId('input-confirmNewPassword'), { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Update Password'));

    await waitFor(() => {
      expect(screen.getByText('New password must be at least 8 characters long.')).toBeInTheDocument();
    });
  });

  it('should simulate password update on valid submit', async () => {
    render(<AccountSecurity />);
    fireEvent.change(screen.getByTestId('input-currentPassword'), { target: { value: 'password123' } }); // Correct mock current password
    fireEvent.change(screen.getByTestId('input-newPassword'), { target: { value: 'newValidPassword123' } });
    fireEvent.change(screen.getByTestId('input-confirmNewPassword'), { target: { value: 'newValidPassword123' } });

    fireEvent.click(screen.getByText('Update Password'));

    expect(screen.getByText('Updating...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Password updated successfully!')).toBeInTheDocument();
    });
    // Check if form fields are reset
    expect(screen.getByTestId('input-currentPassword')).toHaveValue('');
  });
});
