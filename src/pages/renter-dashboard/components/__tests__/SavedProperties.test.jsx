import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SavedProperties from '../SavedProperties';

// Mock UI components and dependencies
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../../components/AppImage', () => (props) => <img {...props} data-testid="app-image" />);
jest.mock('../../../../utils/enums', () => ({
  getPropertyTypeDisplay: (key) => `display ${key}`,
}));

describe('SavedProperties Component', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <SavedProperties />
      </MemoryRouter>
    );
  };

  it('should render the "My Saved Properties" title and property cards', () => {
    setup();
    expect(screen.getByText(/My Saved Properties/)).toBeInTheDocument();

    // Check for mock property titles
    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument();
    expect(screen.getByText('Charming Townhouse with Garden View')).toBeInTheDocument();
  });

  it('should simulate unsaving a property when the button is clicked', async () => {
    setup();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Initial state: two properties are present
    expect(screen.getByText('Spacious 3-Bedroom Apartment in Lekki')).toBeInTheDocument();

    const unsaveButtons = screen.getAllByText('Unsave Property');
    fireEvent.click(unsaveButtons[0]); // Click the first one

    expect(alertSpy).toHaveBeenCalledWith("Property prop1 removed from your saved list! (This is a simulation)");

    // After clicking, the property should be removed from the UI
    await waitFor(() => {
      expect(screen.queryByText('Spacious 3-Bedroom Apartment in Lekki')).not.toBeInTheDocument();
    });

    // The other property should still be there
    expect(screen.getByText('Charming Townhouse with Garden View')).toBeInTheDocument();

    alertSpy.mockRestore();
  });

  it('should display an empty state if no properties are saved', () => {
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], jest.fn()]);
    setup();
    expect(screen.getByText('No Saved Properties Yet')).toBeInTheDocument();
    expect(screen.getByText('Explore Properties')).toBeInTheDocument();
    jest.spyOn(React, 'useState').mockImplementation(originalUseState);
  });
});
