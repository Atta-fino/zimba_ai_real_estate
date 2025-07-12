import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // Needed if there are Links or navigation
import LandlordDashboardPage from '../index';

// Mock child components to isolate LandlordDashboardPage logic (navigation)
jest.mock('../components/MyProperties', () => () => <div data-testid="my-properties-mock">My Properties Mock</div>);
jest.mock('../components/LandlordBookings', () => () => <div data-testid="landlord-bookings-mock">Landlord Bookings Mock</div>);
jest.mock('../components/Earnings', () => () => <div data-testid="earnings-mock">Earnings Mock</div>);
jest.mock('../components/Monetization', () => () => <div data-testid="monetization-mock">Monetization Mock</div>);
jest.mock('../components/LandlordTrustScore', () => () => <div data-testid="landlord-trust-score-mock">Landlord TrustScore Mock</div>);

// Mock AppIcon
jest.mock('../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
// Mock Button (if it's complex and used directly in LandlordDashboardPage's template, though placeholders use it)
jest.mock('../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);


describe('LandlordDashboardPage Component', () => {
  const setup = () => {
    render(
      <MemoryRouter> {/* LandlordDashboardPage itself might not use Link/Outlet directly, but good practice if sub-navs evolve */}
        <LandlordDashboardPage />
      </MemoryRouter>
    );
  };

  it('should render the main heading and sidebar navigation', () => {
    setup();
    expect(screen.getByText('Landlord Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Welcome back, manage your properties and earnings efficiently.')).toBeInTheDocument();

    // Check for sidebar navigation items
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('My Properties')).toBeInTheDocument();
    expect(screen.getByText('Bookings')).toBeInTheDocument();
    expect(screen.getByText('Earnings')).toBeInTheDocument();
    expect(screen.getByText('Monetization')).toBeInTheDocument();
    expect(screen.getByText('My TrustScore')).toBeInTheDocument();
  });

  it('should display the Overview section by default (mocked)', () => {
    setup();
    // The Overview component is inline in LandlordDashboardPage, so we check its content directly
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
    expect(screen.getByText('Total Listings')).toBeInTheDocument();
  });

  it('should switch to My Properties section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('My Properties'));
    expect(screen.getByTestId('my-properties-mock')).toBeVisible();
  });

  it('should switch to Bookings section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Bookings'));
    expect(screen.getByTestId('landlord-bookings-mock')).toBeVisible();
  });

  it('should switch to Earnings section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Earnings'));
    expect(screen.getByTestId('earnings-mock')).toBeVisible();
  });

  it('should switch to Monetization section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Monetization'));
    expect(screen.getByTestId('monetization-mock')).toBeVisible();
  });

  it('should switch to My TrustScore section when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('My TrustScore'));
    expect(screen.getByTestId('landlord-trust-score-mock')).toBeVisible();
  });
});
