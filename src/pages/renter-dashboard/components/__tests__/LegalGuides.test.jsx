import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LegalGuides from '../LegalGuides';

jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('LegalGuides Component', () => {
  it('should render legal guides for the default country (KE) if no prop is passed', () => {
    render(<LegalGuides />);
    expect(screen.getByText(/Helpful Legal Guides for Kenya 🇰🇪/i)).toBeInTheDocument();
    // Check for a Kenya-specific guide title
    expect(screen.getByText('Lease Agreements')).toBeInTheDocument();
    expect(screen.getByText('Deposit Handling')).toBeInTheDocument();
    expect(screen.getByText('Disclaimer')).toBeInTheDocument();
  });

  it('should render legal guides for Ghana (GH) when userCountryCode is "GH"', () => {
    render(<LegalGuides userCountryCode="GH" />);
    expect(screen.getByText(/Helpful Legal Guides for Ghana 🇬🇭/i)).toBeInTheDocument();
    // Check for a Ghana-specific guide title
    expect(screen.getByText('Advance Rent Limit')).toBeInTheDocument();
    expect(screen.getByText('Rent Card')).toBeInTheDocument();
  });

  it('should render general guides if an unsupported country code is passed', () => {
    render(<LegalGuides userCountryCode="XX" />); // XX is not in mockLegalGuidesData
    expect(screen.getByText(/Helpful Legal Guides for General 🌍/i)).toBeInTheDocument();
    // Check for the default guide title
    expect(screen.getByText('Read Your Agreement')).toBeInTheDocument();
  });

  it('should render multiple guides if available for a country', () => {
    render(<LegalGuides userCountryCode="KE" />); // Kenya has 2 guides
    expect(screen.getByText('Lease Agreements')).toBeInTheDocument();
    expect(screen.getByText('Deposit Handling')).toBeInTheDocument();
  });
});
