import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import RenterDashboardPage from '../index';

// Mock child components
jest.mock('../components/MyBookings', () => () => <div data-testid="my-bookings-mock">My Bookings Mock</div>);
jest.mock('../components/SavedProperties', () => () => <div data-testid="saved-properties-mock">Saved Properties Mock</div>);
jest.mock('../components/FlexPay', () => () => <div data-testid="flex-pay-mock">FlexPay Mock</div>);
jest.mock('../components/LegalGuides', () => ({ userCountryCode }) => <div data-testid="legal-guides-mock">Legal Guides Mock ({userCountryCode})</div>);
jest.mock('../components/RenterTrustScore', () => () => <div data-testid="renter-trust-score-mock">Renter TrustScore Mock</div>);

// Mock AppIcon
jest.mock('../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);


describe('RenterDashboardPage Component', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <RenterDashboardPage />
      </MemoryRouter>
    );
  };

  it('should render the main heading and sidebar navigation', () => {
    setup();
    expect(screen.getByText(/Welcome, Amina Diallo!/i)).toBeInTheDocument(); // Mock user name
    expect(screen.getByText("Here's your personal dashboard to manage your Zimba journey.")).toBeInTheDocument();

    expect(screen.getByText('My Bookings')).toBeInTheDocument();
    expect(screen.getByText('Saved Properties')).toBeInTheDocument();
    expect(screen.getByText('FlexPay')).toBeInTheDocument();
    expect(screen.getByText('My TrustScore')).toBeInTheDocument();
    expect(screen.getByText('Legal Guides')).toBeInTheDocument();
  });

  it('should display the My Bookings section by default', () => {
    setup();
    expect(screen.getByTestId('my-bookings-mock')).toBeVisible();
  });

  it('should display the AI Smart Suggestions placeholder', () => {
    setup();
    expect(screen.getByText(/Zimba Smart Suggestions \(Coming Soon!\)/i)).toBeInTheDocument();
  });

  it('should switch to Saved Properties section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Saved Properties'));
    expect(screen.getByTestId('saved-properties-mock')).toBeVisible();
  });

  it('should switch to FlexPay section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('FlexPay'));
    expect(screen.getByTestId('flex-pay-mock')).toBeVisible();
  });

  it('should switch to My TrustScore section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('My TrustScore'));
    expect(screen.getByTestId('renter-trust-score-mock')).toBeVisible();
  });

  it('should switch to Legal Guides section and pass country code', () => {
    setup();
    fireEvent.click(screen.getByText('Legal Guides'));
    expect(screen.getByTestId('legal-guides-mock')).toBeVisible();
    expect(screen.getByText('Legal Guides Mock (KE)')).toBeInTheDocument(); // Mock user country is KE
  });
});
