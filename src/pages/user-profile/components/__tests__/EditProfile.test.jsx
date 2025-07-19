import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditProfile from '../EditProfile';

// Mock UI components used by EditProfile
jest.mock('../../../../components/ui/Input', () => (props) => <input {...props} data-testid={`input-${props.name || props.id}`} />);
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppImage', () => (props) => <img {...props} data-testid="app-image" />);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('EditProfile Component', () => {
  beforeEach(() => {
    // Reset mockCurrentUser for each test if it's modified by submissions
    // This is a simple mock; a more robust solution might involve jest.spyOn or module factories
    jest.isolateModules(() => {
      const EditProfileModule = require('../EditProfile');
      // You might need to re-initialize or reset mockCurrentUser if its state persists across tests
    });
  });

  it('should render the edit profile form with initial mock data', () => {
    render(<EditProfile />);
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();

    // Check if input fields are populated (assuming mockCurrentUser is 'Aisha Bello')
    expect(screen.getByTestId('input-name')).toHaveValue('Aisha Bello');
    expect(screen.getByTestId('input-email')).toHaveValue('aisha.bello@example.com');
    expect(screen.getByTestId('input-phoneNumber')).toHaveValue('+234 801 234 5678');

    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  it('should update form field values on change', () => {
    render(<EditProfile />);
    const nameInput = screen.getByTestId('input-name');
    fireEvent.change(nameInput, { target: { value: 'Aisha B. Updated' } });
    expect(nameInput).toHaveValue('Aisha B. Updated');
  });

  it('should simulate profile update on submit', async () => {
    render(<EditProfile />);
    const nameInput = screen.getByTestId('input-name');
    fireEvent.change(nameInput, { target: { value: 'New Name' } });

    fireEvent.click(screen.getByText('Save Changes'));

    expect(screen.getByText('Saving...')).toBeInTheDocument(); // Loading state

    await waitFor(() => {
      expect(screen.getByText('Profile updated successfully!')).toBeInTheDocument();
    });
    // Check if mockCurrentUser was updated (this depends on how mockCurrentUser is scoped and reset)
    // For this test, we primarily care that the success message appears.
  });
});
