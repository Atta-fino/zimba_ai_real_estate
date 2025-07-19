import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandlordBookings from '../LandlordBookings';

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../../components/AppImage', () => (props) => <img {...props} data-testid="app-image" />);

describe('LandlordBookings Component', () => {
  it('should render the bookings management section with mock bookings', () => {
    render(<LandlordBookings />);
    expect(screen.getByText(/Manage Bookings/)).toBeInTheDocument(); // Title contains count

    // Check for some booking details from mockBookingsData
    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument(); // Property name
    expect(screen.getByText('Chidinma Okoro')).toBeInTheDocument(); // Renter name
    expect(screen.getByText('Babatunde Adebayo')).toBeInTheDocument(); // Another renter

    // Check for status badges (text content of the badge)
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Escrow Active')).toBeInTheDocument();
  });

  it('should allow landlord to confirm a pending booking', async () => {
    render(<LandlordBookings />);
    // Find the "Confirm Booking" button for the pending booking (Babatunde Adebayo's)
    // This relies on the button being uniquely identifiable or being the first one.
    // A more robust selector would be to find the card for Babatunde Adebayo first.
    const confirmButtons = screen.getAllByText('Confirm Booking'); // Might be multiple if other statuses could lead to this text

    // Assuming the first "Confirm Booking" button is for the "pending" one.
    // This is fragile. Let's try to be more specific.
    // Find the booking card for 'Babatunde Adebayo' then the button within it.
    const babatundeBookingCard = screen.getByText('Babatunde Adebayo').closest('div.bg-card'); // Find parent card
    const confirmButton = Array.from(babatundeBookingCard.querySelectorAll('button')).find(btn => btn.textContent.includes('Confirm Booking'));

    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);

    // After clicking, the status should change, and the button might disappear or change
    // Check that the status badge for this booking updates to "Confirmed"
    await waitFor(() => {
      // The specific card for Babatunde Adebayo should now show "Confirmed"
      // And the "Confirm Booking" button should ideally be gone or changed for that specific card
      const updatedCard = screen.getByText('Babatunde Adebayo').closest('div.bg-card');
      expect(Array.from(updatedCard.querySelectorAll('span')).find(span => span.textContent === 'Confirmed')).toBeInTheDocument();
    });
  });

  it('should display an empty state if no bookings are present', () => {
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], jest.fn()]); // Mock bookings state to be empty
    render(<LandlordBookings />);
    expect(screen.getByText('No Bookings Found')).toBeInTheDocument();
    jest.spyOn(React, 'useState').mockImplementation(originalUseState); // Restore original
  });
});
