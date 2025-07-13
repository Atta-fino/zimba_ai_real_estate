import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import RenterDashboardPage from '../index';
import { DiasporaProvider, useDiaspora } from '../../../context/DiasporaContext';

// Mock the context hook
jest.mock('../../../context/DiasporaContext', () => ({
  ...jest.requireActual('../../../context/DiasporaContext'),
  useDiaspora: jest.fn(),
}));

// Mock child panel components
jest.mock('../components/MyBookings', () => () => <div data-testid="my-bookings-mock">My Bookings Mock</div>);
jest.mock('../components/DocumentUpload', () => () => <div data-testid="document-upload-mock">Document Upload Mock</div>);
jest.mock('../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);


describe('RenterDashboardPage Diaspora Enhancements', () => {
  const renderWithDiasporaStatus = (isDiaspora) => {
    useDiaspora.mockReturnValue({ isDiasporaUser: isDiaspora });
    render(
      <DiasporaProvider>
        <MemoryRouter>
          <RenterDashboardPage />
        </MemoryRouter>
      </DiasporaProvider>
    );
  };

  it('should NOT display the "My Documents" tab for a non-diaspora user', () => {
    renderWithDiasporaStatus(false);
    expect(screen.queryByText('My Documents')).not.toBeInTheDocument();
  });

  it('should display the "My Documents" tab for a diaspora user', () => {
    renderWithDiasporaStatus(true);
    expect(screen.getByText('My Documents')).toBeInTheDocument();
  });

  it('should switch to the Document Upload panel when the tab is clicked', () => {
    renderWithDiasporaStatus(true);
    fireEvent.click(screen.getByText('My Documents'));
    expect(screen.getByTestId('document-upload-mock')).toBeVisible();
    expect(screen.queryByTestId('my-bookings-mock')).not.toBeVisible();
  });
});
