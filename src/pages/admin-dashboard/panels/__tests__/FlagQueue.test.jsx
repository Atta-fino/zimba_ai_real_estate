import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import FlagQueue from '../FlagQueue';

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);

describe('FlagQueue Panel Component', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <FlagQueue />
      </MemoryRouter>
    );
  };

  it('should render the panel title and table of flagged items', () => {
    setup();
    expect(screen.getByText('Flag Queue')).toBeInTheDocument();
    expect(screen.getByText('Reported Items (3)')).toBeInTheDocument(); // Based on mockFlagQueue

    // Table headers
    expect(screen.getByText('Reported Item')).toBeInTheDocument();
    expect(screen.getByText('Reason')).toBeInTheDocument();
    expect(screen.getByText('Submitted By')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();

    // Mock data
    expect(screen.getByText('"Luxury" Apartment with No Running Water')).toBeInTheDocument();
    expect(screen.getByText('Misleading Information')).toBeInTheDocument();
    expect(screen.getByText('Amina Diallo')).toBeInTheDocument();
  });

  it('should simulate dismissing a flag', async () => {
    setup();
    const dismissButtons = screen.getAllByText('Dismiss');
    expect(dismissButtons[0]).toBeInTheDocument();

    fireEvent.click(dismissButtons[0]);

    await waitFor(() => {
      // The first item should be removed
      expect(screen.queryByText('"Luxury" Apartment with No Running Water')).not.toBeInTheDocument();
      // The count should update
      expect(screen.getByText('Reported Items (2)')).toBeInTheDocument();
    });
  });

  it('should simulate taking action on a flag', async () => {
    setup();
    const actionButtons = screen.getAllByText('Action');
    expect(actionButtons[1]).toBeInTheDocument(); // Take action on the second item

    fireEvent.click(actionButtons[1]);

    await waitFor(() => {
      // The second item should be removed
      expect(screen.queryByText('Landlord "Mr. Ghost"')).not.toBeInTheDocument();
      expect(screen.getByText('Reported Items (2)')).toBeInTheDocument();
    });
  });

  it('should display an empty queue message if no flags are present', () => {
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], jest.fn()]); // Mock queue to be empty
    render(<FlagQueue />);
    expect(screen.getByText('The flag queue is clear. Well done!')).toBeInTheDocument();
    jest.spyOn(React, 'useState').mockImplementation(originalUseState);
  });
});
