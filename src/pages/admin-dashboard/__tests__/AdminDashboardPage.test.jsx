import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminDashboardPage from '../index';

// Mock panel components
jest.mock('../panels/CommissionsOverview', () => () => <div data-testid="commissions-overview-mock">Commissions Overview</div>);
jest.mock('../panels/VerificationQueue', () => () => <div data-testid="verification-queue-mock">Verification Queue</div>);
jest.mock('../panels/FlagQueue', () => () => <div data-testid="flag-queue-mock">Flag Queue</div>);

// Mock AppIcon
jest.mock('../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('AdminDashboardPage Component', () => {
  const setup = (initialRoute = '/admin/commissions') => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
            <Route path="/admin/*" element={<AdminDashboardPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('should render the admin dashboard title and sidebar navigation', () => {
    setup();
    expect(screen.getByText('Zimba Admin')).toBeInTheDocument();

    expect(screen.getByText('Verification Queue')).toBeInTheDocument();
    expect(screen.getByText('Flag Queue')).toBeInTheDocument();
    expect(screen.getByText('Commissions')).toBeInTheDocument();
    expect(screen.getByText('Go to Main Site')).toBeInTheDocument();
  });

  it('should display the Commissions Overview panel by default (or if /admin/commissions is the route)', () => {
    setup('/admin/commissions');
    expect(screen.getByTestId('commissions-overview-mock')).toBeVisible();
  });

  it('should display Verification Queue panel when navigating to /admin/verification', () => {
    setup('/admin/verification');
    expect(screen.getByTestId('verification-queue-mock')).toBeVisible();
  });

  it('should switch to Verification Queue panel when its navigation item is clicked', () => {
    setup(); // Defaults to commissions
    fireEvent.click(screen.getByText('Verification Queue'));
    expect(screen.getByTestId('verification-queue-mock')).toBeVisible();
    expect(screen.queryByTestId('commissions-overview-mock')).not.toBeVisible();
  });

  it('should switch to Flag Queue panel when its navigation item is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Flag Queue'));
    expect(screen.getByTestId('flag-queue-mock')).toBeVisible();
  });
});
