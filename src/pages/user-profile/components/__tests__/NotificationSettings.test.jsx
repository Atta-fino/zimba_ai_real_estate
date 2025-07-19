import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationSettings from '../NotificationSettings';

// Mock Checkbox, Button, and Icon
jest.mock('../../../../components/ui/Checkbox', () => ({ id, checked, onCheckedChange, ...props }) => (
  <input type="checkbox" id={id} checked={checked} onChange={() => onCheckedChange(!checked)} {...props} data-testid={id} />
));
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('NotificationSettings Component', () => {
  it('should render notification settings form with initial mock data', () => {
    render(<NotificationSettings />);
    expect(screen.getByText('Notification Settings')).toBeInTheDocument();

    // Check a few toggles based on mockNotificationSettings
    // Email - Booking Updates (true)
    expect(screen.getByTestId('email-bookingUpdates')).toBeChecked();
    // Email - Promotional Messages (false)
    expect(screen.getByTestId('email-promotionalMessages')).not.toBeChecked();
    // SMS - Rent Reminders (true)
    expect(screen.getByTestId('sms-rentReminders')).toBeChecked();

    expect(screen.getByText('Save Preferences')).toBeInTheDocument();
  });

  it('should toggle a setting when clicked', () => {
    render(<NotificationSettings />);
    const emailBookingUpdatesToggle = screen.getByTestId('email-bookingUpdates');
    expect(emailBookingUpdatesToggle).toBeChecked(); // Initially true
    fireEvent.click(emailBookingUpdatesToggle);
    expect(emailBookingUpdatesToggle).not.toBeChecked(); // Should be false after click
  });

  it('should simulate saving settings on submit', async () => {
    render(<NotificationSettings />);
    // Toggle a setting to make a change
    fireEvent.click(screen.getByTestId('email-promotionalMessages')); // Was false, now true

    fireEvent.click(screen.getByText('Save Preferences'));

    expect(screen.getByText('Saving...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Settings saved successfully!')).toBeInTheDocument();
    });
  });
});
