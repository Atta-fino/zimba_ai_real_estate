import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AIChatSupportInterface from '../index';

// Mock child components that are not essential for this flow test
jest.mock('../../../components/ui/Header', () => () => <header>Header</header>);
jest.mock('../../../components/ui/PrimaryTabNavigation', () => () => <nav>Primary Nav</nav>);
jest.mock('../../../components/ui/FloatingChatButton', () => () => null); // Hide the button on this page

// To make this test work, we need to not mock the core chat components, just the page layout.
// We also need to mock the MessageInput to check for its props and state changes.

// Mock child components
jest.mock('../../../components/ui/Header', () => () => <header>Header</header>);
jest.mock('../../../components/ui/PrimaryTabNavigation', () => () => <nav>Primary Nav</nav>);
jest.mock('../../../components/ui/FloatingChatButton', () => () => null);
// Let's mock MessageInput to have more control over its interactions
jest.mock('../components/MessageInput', () => require('../__mocks__/MessageInput.mock').default);


describe('AIChatSupportInterface Page - Enhanced Interactivity', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <AIChatSupportInterface />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
     // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should render the refined welcome message and quick replies', () => {
    setup();
    expect(screen.getByText('AI Chat Support')).toBeInTheDocument();

    // Check for the new, warmer welcome message
    expect(screen.getByText(/Hello there! I'm Zimba AI, your friendly guide/i)).toBeInTheDocument();

    // Check for the new quick reply buttons
    expect(screen.getByText('How does Escrow work?')).toBeInTheDocument();
    expect(screen.getByText('Tell me about FlexPay')).toBeInTheDocument();
    expect(screen.getByText('Why should I trust Zimba?')).toBeInTheDocument();
  });

  it('should handle multi-step AI responses for a quick reply', async () => {
    setup();

    // User clicks the first quick reply
    fireEvent.click(screen.getByText('How does Escrow work?'));

    // The user's message should appear
    await screen.findByText('How does Escrow work?');

    // The first AI response should appear after a delay
    await waitFor(() => {
      expect(screen.getByText(/Of course! Escrow is a secure financial arrangement/i)).toBeInTheDocument();
    }, { timeout: 2000 });

    // The AI's response should have its own set of follow-up quick replies
    expect(screen.getByText('What happens after I pay?')).toBeInTheDocument();
    expect(screen.getByText('Is my money really safe?')).toBeInTheDocument();
  });

  it('should provide a contextual response using mock user and property data', async () => {
    setup();
    // Use the mock for the MessageInput component to simulate sending a message
    const { sendMessage } = require('../components/MessageInput').__getMocks();
    sendMessage('This is a test message');

    // The user's message appears
    await screen.findByText('This is a test message');

    // The default AI response should now be contextual
    await waitFor(() => {
        // It should use the mock user's name ('Amina')
        // and the mock property's title ('Modern Downtown Apartment')
        const response = screen.getByText(/Hi Amina, that's a great question about "This is a test message"./i);
        expect(response).toBeInTheDocument();
        expect(response.textContent).toContain('Are you asking in relation to the "Modern Downtown Apartment" listing?');
    }, { timeout: 2000 });
  });

  it('should simulate voice-to-text input', async () => {
    setup();
    const { getMicButton, getMessageInput } = require('../components/MessageInput').__getMocks();
    const micButton = getMicButton();

    fireEvent.click(micButton);

    // The input should be populated with the mock transcribed text after a delay
    await waitFor(() => {
        expect(getMessageInput().value).toBe("Tell me more about the security features of this property.");
    }, { timeout: 3000 }); // Wait for the 2.5s timeout in the simulation
  });
});
