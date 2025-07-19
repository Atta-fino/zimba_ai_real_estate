import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguagePreferences from '../LanguagePreferences';

// Mock Select, Button, Input, and Icon
// A more specific mock for Select might be needed if its API is complex
jest.mock('../../../../components/ui/Select', () => ({ id, value, onValueChange, children, ...props }) => (
  <select data-testid={id} value={value} onChange={(e) => onValueChange(e.target.value)} {...props}>
    {children}
  </select>
));
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/ui/Input', () => (props) => <input {...props} data-testid={`input-${props.name || props.id}`} />);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);


describe('LanguagePreferences Component', () => {
  it('should render language preferences form with initial mock data', () => {
    render(<LanguagePreferences />);
    expect(screen.getByText('Language & Region Settings')).toBeInTheDocument();

    // Check if select has the default language (English, code 'en')
    expect(screen.getByTestId('languageSelect')).toHaveValue('en');

    // Check for some language options
    expect(screen.getByText('🇬🇧 English')).toBeInTheDocument();
    expect(screen.getByText('🇫🇷 Français (French)')).toBeInTheDocument();

    expect(screen.getByText('Save Preferences')).toBeInTheDocument();
  });

  it('should change selected language on select change', () => {
    render(<LanguagePreferences />);
    const languageSelect = screen.getByTestId('languageSelect');
    fireEvent.change(languageSelect, { target: { value: 'fr' } }); // Change to French
    expect(languageSelect).toHaveValue('fr');
  });

  it('should simulate saving language preference on submit', async () => {
    render(<LanguagePreferences />);
    fireEvent.change(screen.getByTestId('languageSelect'), { target: { value: 'sw' } }); // Change to Swahili

    fireEvent.click(screen.getByText('Save Preferences'));

    expect(screen.getByText('Saving...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Language preference saved!')).toBeInTheDocument();
    });
  });
});
