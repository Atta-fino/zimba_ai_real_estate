import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RenterTrustScore from '../RenterTrustScore';

jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('RenterTrustScore Component', () => {
  it('should render the Renter TrustScore section with mock data', () => {
    render(<RenterTrustScore />);
    expect(screen.getByText('Your TrustScore')).toBeInTheDocument();

    // Intro text
    expect(screen.getByText('What is a TrustScore?')).toBeInTheDocument();

    // Main score (mocked as 4.5)
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('/5')).toBeInTheDocument();

    // Component breakdown
    expect(screen.getByText('How Your Score is Calculated')).toBeInTheDocument();
    expect(screen.getByText('Profile Completion')).toBeInTheDocument();
    expect(screen.getByText('20 / 20 pts')).toBeInTheDocument(); // Example from mock data
    expect(screen.getByText('On-Time Payments')).toBeInTheDocument();
    expect(screen.getByText('25 / 30 pts')).toBeInTheDocument(); // Example

    // Tips section
    expect(screen.getByText('How to Maintain a High Score')).toBeInTheDocument();
    expect(screen.getByText('Always pay your rent on or before the due date.')).toBeInTheDocument();
  });

  it('should display progress bars for score components', () => {
    render(<RenterTrustScore />);
    // mockRenterTrustScoreData.components has 5 items.
    // The main score also has a progress bar.
    // Similar to LandlordTrustScore test, we check for presence of score parts.
    expect(screen.getAllByText(/pts/i).length).toBeGreaterThanOrEqual(mockRenterTrustScoreData.components.length);
  });
});

// Re-adding mockRenterTrustScoreData here for the test to access it for the assertion.
const mockRenterTrustScoreData = {
  score: 4.5,
  components: [
    { name: 'Profile Completion', weight: 20, value: 20, description: "Your profile is fully complete. Well done!" },
    { name: 'ID Verification', weight: 20, value: 20, description: "Your identity has been verified." },
    { name: 'On-Time Payments', weight: 30, value: 25, description: "History of paying rent and fees on time." },
    { name: 'Communication', weight: 15, value: 12, description: "Responsiveness and clarity in chats with landlords." },
    { name: 'Landlord Reviews', weight: 15, value: 13, description: "Positive reviews from your past landlords." },
  ],
  tips: ["Always pay your rent on or before the due date."]
};
