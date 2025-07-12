import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandlordVerification from '../LandlordVerification';

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/ui/Input', () => (props) => <input {...props} data-testid="file-input" type="file" />);
jest.mock('../../../../components/AppIcon', () => ({ name, className }) => <svg data-testid={`icon-${name}`} className={className} />);
jest.mock('../../../../components/AppImage', () => (props) => <img {...props} data-testid="app-image" />);

// Mock initial state of verificationData for predictable tests
const initialMockVerificationData = {
  status: 'not_verified',
  idImage: null,
  biometricSubmitted: false,
  aiScore: null,
  riskResult: null,
  humanReviewNotes: null,
  badges: [],
  rejectionReason: null,
};

// Helper to allow spying on useState and resetting its mock
let mockSetVerificationData = jest.fn();
const mockUseState = (initialValue) => {
  // If initialValue matches our target (mockVerificationData structure), use our controlled state
  if (typeof initialValue === 'object' && initialValue !== null && 'status' in initialValue && 'idImage' in initialValue) {
    return [initialMockVerificationData, mockSetVerificationData];
  }
  // Otherwise, fall back to React's actual useState for other states in the component
  return React.useState(initialValue);
};


describe('LandlordVerification Component', () => {
  let originalUseState;

  beforeEach(() => {
    originalUseState = React.useState;
    React.useState = mockUseState; // Apply the mock
    mockSetVerificationData.mockClear();
    // Reset initialMockVerificationData for each test to ensure clean state
    Object.assign(initialMockVerificationData, {
        status: 'not_verified',
        idImage: null,
        biometricSubmitted: false,
        aiScore: null,
        riskResult: null,
        humanReviewNotes: null,
        badges: [],
        rejectionReason: null,
    });
  });

  afterEach(() => {
    React.useState = originalUseState; // Restore original useState
  });

  it('should render the verification section and initial status', () => {
    render(<LandlordVerification />);
    expect(screen.getByText('Landlord Verification')).toBeInTheDocument();
    expect(screen.getByText('Your Verification Status')).toBeInTheDocument();
    expect(screen.getByText('Not Verified')).toBeInTheDocument(); // Initial mock status
    expect(screen.getByText('Step 1: Identity Document')).toBeInTheDocument();
    expect(screen.getByText('Submit ID Document')).toBeInTheDocument();
  });

  it('should allow ID image upload and simulate submission', async () => {
    render(<LandlordVerification />);

    const fileInput = screen.getByTestId('file-input'); // Assuming Input mock creates data-testid="file-input"
    const testFile = new File(['(⌐□_□)'], 'test-id.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [testFile] } });

    // Check for preview (difficult to test precisely without knowing AppImage's internals for src)
    // For now, assume handleIdImageChange updates state that would lead to AppImage src change.

    const submitButton = screen.getByText('Submit ID Document');
    fireEvent.click(submitButton);

    expect(screen.getByText('Submit ID Document').closest('button')).toBeDisabled(); // Or check for loading icon/text

    await waitFor(() => {
      // Check if mockSetVerificationData was called with the new status
      expect(mockSetVerificationData).toHaveBeenCalledWith(expect.any(Function));
      // Call the updater function to see its effect
      const lastCallFirstArg = mockSetVerificationData.mock.calls[mockSetVerificationData.mock.calls.length-1][0];
      const newState = lastCallFirstArg(initialMockVerificationData); // pass the old state
      expect(newState.status).toBe('pending_ai_review');
    });
  });

  it('should show biometric submission section when ID is submitted (AI verified)', async () => {
    // Update mock state to simulate ID being AI verified
    initialMockVerificationData.status = 'ai_verified';
    initialMockVerificationData.idImage = '/assets/images/stock/sample_id.png';

    render(<LandlordVerification />);

    expect(screen.getByText('AI Verified')).toBeInTheDocument();
    expect(screen.getByText('Step 2: Biometric Verification')).toBeInTheDocument();
    const biometricButton = screen.getByText('Start Biometric Check (Simulated)');
    expect(biometricButton).toBeInTheDocument();
    fireEvent.click(biometricButton);

    await waitFor(() => {
        const lastCallFirstArg = mockSetVerificationData.mock.calls[mockSetVerificationData.mock.calls.length-1][0];
        const newState = lastCallFirstArg(initialMockVerificationData);
        expect(newState.biometricSubmitted).toBe(true);
        expect(newState.status).toBe('pending_human_review');
    });
  });

   it('should display rejection status and reason if verification is rejected', () => {
    initialMockVerificationData.status = 'rejected';
    initialMockVerificationData.rejectionReason = 'Document unclear.';
    render(<LandlordVerification />);
    expect(screen.getByText('Verification Rejected')).toBeInTheDocument();
    expect(screen.getByText(/Reason: Document unclear./i)).toBeInTheDocument();
    // Should still be able to submit ID again
    expect(screen.getByText('Submit ID Document')).toBeInTheDocument();
  });

  it('should display human_verified status and congratulations message', () => {
    initialMockVerificationData.status = 'human_verified';
    render(<LandlordVerification />);
    expect(screen.getByText('Human Verified')).toBeInTheDocument();
    expect(screen.getByText(/Congratulations! You are Fully Verified!/i)).toBeInTheDocument();
    // ID and Biometric submission sections should ideally not prompt for new submission
    expect(screen.queryByText('Submit ID Document')).not.toBeInTheDocument();
    expect(screen.queryByText('Start Biometric Check (Simulated)')).not.toBeInTheDocument();
  });
});
