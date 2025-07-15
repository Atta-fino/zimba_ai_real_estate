import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BookingFlowPage from '../index';
import { DiasporaProvider } from '../../../context/DiasporaContext';

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../components/ui/PaymentSummary', () => () => <div data-testid="payment-summary-mock">Payment Summary</div>);

// Mock the mock data store
jest.mock('../../../data/mockBookings', () => ({
  addBooking: jest.fn(),
}));
import { addBooking } from '../../../data/mockBookings';


describe('BookingFlowPage Component', () => {
  const setup = () => {
    render(
      <DiasporaProvider>
        <MemoryRouter initialEntries={['/book/prop1']}>
          <Routes>
            <Route path="/book/:propertyId" element={<BookingFlowPage />} />
          </Routes>
        </MemoryRouter>
      </DiasporaProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Step 1 (Confirm Details) by default after loading', async () => {
    setup();
    await waitFor(() => {
        expect(screen.getByText('Confirm Your Booking Details')).toBeInTheDocument();
    });
    expect(screen.getByTestId('payment-summary-mock')).toBeInTheDocument();
    expect(screen.getByText('Proceed to Payment')).toBeInTheDocument();
  });

  it('should progress from Step 1 to Step 2', async () => {
    setup();
    await waitFor(() => expect(screen.getByText('Proceed to Payment')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Proceed to Payment'));

    await waitFor(() => {
        expect(screen.getByText('Secure Payment Gateway')).toBeInTheDocument();
    });
    expect(screen.getByText('Pay Now')).toBeInTheDocument();
  });

  it('should progress from Step 2 to Step 3 after mock payment', async () => {
    setup();
    // Navigate to step 2
    await waitFor(() => expect(screen.getByText('Proceed to Payment')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Proceed to Payment'));
    await waitFor(() => expect(screen.getByText('Pay Now')).toBeInTheDocument());

    // Click Pay Now
    fireEvent.click(screen.getByText('Pay Now'));

    // Should show loading state, then confirmation
    await waitFor(() => {
        expect(screen.getByText('Booking Confirmed & Secured!')).toBeInTheDocument();
    }, { timeout: 2000 }); // Wait for 1.5s timeout in component

    // Verify that our mock addBooking function was called
    expect(addBooking).toHaveBeenCalled();
    expect(addBooking.mock.calls[0][0].propertyName).toBe('Modern Downtown Apartment');
  });

  it('should allow going back from Step 2 to Step 1', async () => {
    setup();
    // Navigate to step 2
    await waitFor(() => expect(screen.getByText('Proceed to Payment')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Proceed to Payment'));
    await waitFor(() => expect(screen.getByText('Go Back')).toBeInTheDocument());

    // Go back
    fireEvent.click(screen.getByText('Go Back'));

    await waitFor(() => {
        expect(screen.getByText('Confirm Your Booking Details')).toBeInTheDocument();
    });
  });
});
