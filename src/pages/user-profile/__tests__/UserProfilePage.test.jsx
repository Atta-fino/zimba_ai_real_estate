import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import UserProfilePage from '../index';

// Mock child components to isolate UserProfilePage logic (navigation)
jest.mock('../components/EditProfile', () => () => <div data-testid="edit-profile-mock">Edit Profile Mock</div>);
jest.mock('../components/AccountSecurity', () => () => <div data-testid="account-security-mock">Account Security Mock</div>);
jest.mock('../components/NotificationSettings', () => () => <div data-testid="notification-settings-mock">Notification Settings Mock</div>);
jest.mock('../components/LanguagePreferences', () => () => <div data-testid="language-preferences-mock">Language Preferences Mock</div>);

// Mock AppIcon
jest.mock('../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('UserProfilePage Component', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <UserProfilePage />
      </MemoryRouter>
    );
  };

  it('should render the main heading and sidebar navigation', () => {
    setup();
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
    expect(screen.getByText('Manage your profile, security, and preferences.')).toBeInTheDocument();

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByText('Account Security')).toBeInTheDocument();
    expect(screen.getByText('Notification Settings')).toBeInTheDocument();
    expect(screen.getByText('Language & Region')).toBeInTheDocument();
  });

  it('should display the Edit Profile section by default', () => {
    setup();
    expect(screen.getByTestId('edit-profile-mock')).toBeVisible();
    expect(screen.queryByTestId('account-security-mock')).not.toBeVisible(); // Or check if it's not in document if components are conditionally rendered
  });

  it('should switch to Account Security section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Account Security'));
    expect(screen.getByTestId('account-security-mock')).toBeVisible();
    expect(screen.queryByTestId('edit-profile-mock')).not.toBeVisible();
  });

  it('should switch to Notification Settings section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Notification Settings'));
    expect(screen.getByTestId('notification-settings-mock')).toBeVisible();
  });

  it('should switch to Language & Region section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Language & Region'));
    expect(screen.getByTestId('language-preferences-mock')).toBeVisible();
  });
});
