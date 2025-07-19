import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandlordTrustScore from '../LandlordTrustScore';

jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
// SimpleProgressBar is defined within LandlordTrustScore.jsx, so no need to mock unless it was external

describe('LandlordTrustScore Component', () => {
  it('should render the TrustScore section with mock data', () => {
    render(<LandlordTrustScore />);
    expect(screen.getByText('My TrustScore')).toBeInTheDocument();

    // Check for the main score (mocked as 4.2)
    expect(screen.getByText('4.2')).toBeInTheDocument();
    expect(screen.getByText('/5')).toBeInTheDocument();

    // Check for component breakdown section and some component names
    expect(screen.getByText('How Your Score is Calculated')).toBeInTheDocument();
    expect(screen.getByText('Verification Status')).toBeInTheDocument();
    expect(screen.getByText('Responsiveness')).toBeInTheDocument();
    expect(screen.getByText('Property Flags')).toBeInTheDocument();

    // Check for tips section
    expect(screen.getByText('Tips to Improve Your TrustScore')).toBeInTheDocument();
    // Check for one of the tips
    expect(screen.getByText('Ensure your profile and property documents are fully verified.')).toBeInTheDocument();
  });

  it('should display progress bars for score components', () => {
    render(<LandlordTrustScore />);
    // mockTrustScoreData.components has 6 items.
    // The main score also has a progress bar.
    // So, we expect at least number of components + 1 progress bars.
    // The SimpleProgressBar component renders a div with role="progressbar" implicitly via styles,
    // but testing library might not pick it up by role without explicit role attribute.
    // We can check for the presence of elements styled as progress bars.
    // For this basic test, we'll just confirm the section renders. A more detailed test
    // could inspect the style attribute of the progress bar divs if needed.
    expect(screen.getAllByText(/pts|%/i).length).toBeGreaterThanOrEqual(mockTrustScoreData.components.length);
  });
});

// Re-adding mockTrustScoreData here for the test to access it for the assertion.
// In a real scenario, this might be imported if it were from a shared mock file.
const mockTrustScoreData = {
    score: 4.2,
    components: [
      { name: 'Verification Status', weight: 20, value: 18, description: "ID & property docs verified." },
      { name: 'Responsiveness', weight: 20, value: 15, description: "Average response time to inquiries." },
      { name: 'Property Flags', weight: -30, value: -5, description: "Recent flags or complaints. (Lower is better for value here, but displayed as impact)" },
      { name: 'Deals Completed', weight: 20, value: 16, description: "Successfully completed bookings." },
      { name: 'Payment History', weight: 10, value: 8, description: "Timeliness of any Zimba service payments." },
      { name: 'Review Timeliness', weight: 10, value: 7, description: "Promptness in reviewing tenants post-stay." },
    ],
    tips: ["Ensure your profile and property documents are fully verified."] // only need one for test
  };
