import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MyBookings from '../MyBookings';

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../../components/AppImage', () => (props) => <img {...props} data-testid="app-image" />);

describe('MyBookings Component (Renter View)', () => {
  const setup = () => {
    render(
      <MemoryRouter> {/* Needed because MyBookings uses <Link> */}
        <MyBookings />
      </MemoryRouter>
    );
  };

  it('should render the "My Bookings & Escrow Status" title and booking cards', () => {
    setup();
    expect(screen.getByText('My Bookings & Escrow Status')).toBeInTheDocument();

    // Check for property names from mockRenterBookings
    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument();
    expect(screen.getByText('Modern Office Space in Ikeja')).toBeInTheDocument();

    // Check for EscrowStateBadges
    expect(screen.getByText('Escrow Active (Awaiting Keys)')).toBeInTheDocument();
    expect(screen.getByText('Pending Confirmation')).toBeInTheDocument();
  });

  it('should show "Pay into Escrow" button for "confirmed" bookings and simulate action', async () => {
    setup();
    // Find the card for "Studio Flat in Surulere" which has 'confirmed' status
    const studioFlatCard = screen.getByText('Studio Flat in Surulere').closest('div.bg-card');
    const payButton = Array.from(studioFlatCard.querySelectorAll('button')).find(btn => btn.textContent.includes('Pay into Escrow'));

    expect(payButton).toBeInTheDocument();

    // Mock window.alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(payButton);

    expect(alertSpy).toHaveBeenCalledWith("You would now be redirected to a secure payment page to fund the escrow for this booking. (This is a simulation)");

    // Check if status updates in UI (this depends on how state update is mocked/handled)
     await waitFor(() => {
      const updatedCard = screen.getByText('Studio Flat in Surulere').closest('div.bg-card');
      expect(Array.from(updatedCard.querySelectorAll('span')).find(span => span.textContent === 'Escrow Active (Awaiting Keys)')).toBeInTheDocument();
    });
    alertSpy.mockRestore();
  });

  it('should show "I\'ve Received My Keys!" button for "escrow_active" bookings and simulate action', async () => {
    setup();
    // Find the card for "Spacious 3-Bedroom Apartment in Lekki" which has 'escrow_active' status
    const apartmentCard = screen.getByText('Spacious 3-Bedroom Apartment in Lekki').closest('div.bg-card');
    const keysButton = Array.from(apartmentCard.querySelectorAll('button')).find(btn => btn.textContent.includes("I've Received My Keys!"));

    expect(keysButton).toBeInTheDocument();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(keysButton);

    expect(alertSpy).toHaveBeenCalledWith("Thank you for confirming! Your landlord will be notified, and the escrow process will proceed.");

    await waitFor(() => {
      const updatedCard = screen.getByText('Spacious 3-Bedroom Apartment in Lekki').closest('div.bg-card');
      expect(Array.from(updatedCard.querySelectorAll('span')).find(span => span.textContent === 'Keys Received (Rent Active)')).toBeInTheDocument();
    });
    alertSpy.mockRestore();
  });

  it('should display an empty state if no bookings are present', () => {
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], jest.fn()]);
    setup();
    expect(screen.getByText('You have no bookings yet.')).toBeInTheDocument();
    expect(screen.getByText('Find Properties')).toBeInTheDocument();
    jest.spyOn(React, 'useState').mockImplementation(originalUseState);
  });
});
