import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VerificationQueue from '../VerificationQueue';

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../../components/AppImage', () => (props) => <img {...props} data-testid="app-image" alt={props.alt || 'mock-image'}/>);

describe('VerificationQueue Panel Component', () => {
  const setup = () => {
    render(<VerificationQueue />);
  };

  beforeEach(() => {
    // Mock window.alert for approve/reject actions
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the panel title and list of pending verifications', () => {
    setup();
    expect(screen.getByText('Verification Queue')).toBeInTheDocument();
    expect(screen.getByText('Pending Submissions (3)')).toBeInTheDocument(); // Based on mockVerificationQueue

    // Check for user names from mock data
    expect(screen.getByText('Aisha Bello')).toBeInTheDocument();
    expect(screen.getByText('Babatunde Adebayo')).toBeInTheDocument();
  });

  it('should display details when a verification item is selected', () => {
    setup();
    fireEvent.click(screen.getByText('Aisha Bello')); // Select the first item

    expect(screen.getByText('Review Details')).toBeInTheDocument();
    expect(screen.getByText('User ID: landlord_A')).toBeInTheDocument();
    expect(screen.getByAltText('ID Document')).toBeInTheDocument(); // AppImage mock uses alt
    expect(screen.getByText('Approve')).toBeInTheDocument();
    expect(screen.getByText('Reject')).toBeInTheDocument();
  });

  it('should simulate approving a verification', async () => {
    setup();
    fireEvent.click(screen.getByText('Aisha Bello')); // Select
    fireEvent.click(screen.getByText('Approve'));

    expect(window.alert).toHaveBeenCalledWith('Verification for Aisha Bello approved!');
    await waitFor(() => {
      expect(screen.queryByText('Aisha Bello')).not.toBeInTheDocument(); // Item removed from queue
      expect(screen.getByText('Pending Submissions (2)')).toBeInTheDocument();
    });
  });

  it('should require notes for rejection and simulate rejecting a verification', async () => {
    setup();
    fireEvent.click(screen.getByText('Babatunde Adebayo')); // Select

    const rejectButton = screen.getByText('Reject');
    fireEvent.click(rejectButton); // Try to reject without notes
    expect(window.alert).toHaveBeenCalledWith("Please provide rejection notes before rejecting.");

    const notesTextarea = screen.getByPlaceholderText(/e.g., Document is blurry/i);
    fireEvent.change(notesTextarea, { target: { value: 'ID photo is unclear.' } });
    fireEvent.click(rejectButton);

    expect(window.alert).toHaveBeenCalledWith('Verification for Babatunde Adebayo rejected.');
    await waitFor(() => {
      expect(screen.queryByText('Babatunde Adebayo')).not.toBeInTheDocument();
      expect(screen.getByText('Pending Submissions (1)')).toBeInTheDocument();
    });
  });

  it('should display an empty queue message if no items are pending', () => {
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], jest.fn()]); // Mock queue to be empty
    render(<VerificationQueue />);
    expect(screen.getByText('The verification queue is empty. Great job!')).toBeInTheDocument();
    jest.spyOn(React, 'useState').mockImplementation(originalUseState); // Restore
  });
});
