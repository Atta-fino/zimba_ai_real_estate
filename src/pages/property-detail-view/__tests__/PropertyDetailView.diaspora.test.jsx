import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PropertyDetailView from '../index';
import { DiasporaProvider, useDiaspora } from '../../../context/DiasporaContext';

// Mock the context hook
jest.mock('../../../context/DiasporaContext', () => ({
  ...jest.requireActual('../../../context/DiasporaContext'), // Keep original provider
  useDiaspora: jest.fn(),
}));

// Mock other dependencies
jest.mock('../../../components/AppImage', () => (props) => <img {...props} data-testid="app-image" />);
jest.mock('../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);


describe('PropertyDetailView Diaspora Enhancements', () => {
  const renderWithDiasporaStatus = (isDiaspora, propertyId = '1') => {
    useDiaspora.mockReturnValue({ isDiasporaUser: isDiaspora });
    render(
      <DiasporaProvider>
        <MemoryRouter initialEntries={[`/property-detail-view/${propertyId}`]}>
          <Routes>
            <Route path="/property-detail-view/:id" element={<PropertyDetailView />} />
          </Routes>
        </MemoryRouter>
      </DiasporaProvider>
    );
  };

  it('should NOT display diaspora features for a non-diaspora user', async () => {
    renderWithDiasporaStatus(false);
    await screen.findByText('Modern Downtown Apartment'); // Wait for content to load

    expect(screen.queryByText('Trusted for Diaspora')).not.toBeInTheDocument();
    expect(screen.queryByText('Request a Live Virtual Tour')).not.toBeInTheDocument();
  });

  it('should display diaspora features for a diaspora user', async () => {
    renderWithDiasporaStatus(true);
    await screen.findByText('Modern Downtown Apartment');

    expect(screen.getByText('Trusted for Diaspora')).toBeInTheDocument();
    expect(screen.getByText('Request a Live Virtual Tour')).toBeInTheDocument();
  });

  it('should NOT display "Trusted for Diaspora" badge if property is not marked as such, even for a diaspora user', async () => {
     // We need to test with property "2" from the mock, which doesn't have `trustedForDiaspora: true`
    renderWithDiasporaStatus(true, '2');
    await screen.findByText('Spacious Family Villa with Garden');

    expect(screen.queryByText('Trusted for Diaspora')).not.toBeInTheDocument();
    // The virtual tour request button should still be there for any property
    expect(screen.getByText('Request a Live Virtual Tour')).toBeInTheDocument();
  });

  it('should always display the Secure with Escrow and Chat with Landlord buttons', async () => {
    renderWithDiasporaStatus(false); // Render as non-diaspora user
    await screen.findByText('Modern Downtown Apartment');

    expect(screen.getByText('Secure with Escrow')).toBeInTheDocument();
    expect(screen.getByText('Chat with Landlord')).toBeInTheDocument();
  });
});
