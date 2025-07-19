import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import FlagQueue from '../FlagQueue';
import { updatePropertyStatus } from '../../../data/mockProperties';

// Mock the data store
jest.mock('../../../../data/mockProperties', () => ({
  updatePropertyStatus: jest.fn(),
}));

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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the panel title and table of flagged items', () => {
        setup();
        expect(screen.getByText('Flag Queue')).toBeInTheDocument();
        expect(screen.getByText(/Reported Items/)).toBeInTheDocument();

        // Check for mock data
        expect(screen.getByText('"Luxury" Apartment with No Running Water')).toBeInTheDocument();
        expect(screen.getByText('Unresponsive Landlord')).toBeInTheDocument();
    });

    it('should call updatePropertyStatus when taking action on a property flag', async () => {
        setup();
        const actionButtons = screen.getAllByText('Action');
        // Find the action button corresponding to the first property flag
        const propertyFlagAction = actionButtons.find(button =>
            button.closest('tr').textContent.includes('Misleading Information')
        );

        fireEvent.click(propertyFlagAction);

        await waitFor(() => {
            expect(updatePropertyStatus).toHaveBeenCalledWith('prop_flagged_123', 'hidden');
        });

        // Also check that the item is removed from the queue UI
        expect(screen.queryByText('"Luxury" Apartment with No Running Water')).not.toBeInTheDocument();
    });

    it('should dismiss a flag without calling property update function', async () => {
        setup();
        const dismissButtons = screen.getAllByText('Dismiss');
        fireEvent.click(dismissButtons[0]);

        await waitFor(() => {
            expect(screen.queryByText('"Luxury" Apartment with No Running Water')).not.toBeInTheDocument();
        });
        // Ensure the property status function was NOT called for a dismissal
        expect(updatePropertyStatus).not.toHaveBeenCalled();
    });
});
