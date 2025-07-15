import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AIChatSupportInterface from '../index';

// Mock child components that are not essential for this flow test
jest.mock('../../../components/ui/Header', () => () => <header>Header</header>);
jest.mock('../../../components/ui/PrimaryTabNavigation', () => () => <nav>Primary Nav</nav>);
jest.mock('../../../components/ui/FloatingChatButton', () => () => null); // Hide the button on this page

// Mock sub-components of the chat interface to simplify testing the main page logic
// We can test these individually if needed. For now, we test their integration.
// To make this test work, we need to not mock the core chat components.
// So we will mock only the top-level layout components.

describe('AIChatSupportInterface Page', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <AIChatSupportInterface />
      </MemoryRouter>
    );
  };

  it('should render the chat interface with a welcome message', () => {
    setup();
    expect(screen.getByText('AI Chat Support')).toBeInTheDocument();

    // Check for the welcome message from the mock data
    expect(screen.getByText(/Hello! 👋 I'm Zimba AI, your real estate assistant./i)).toBeInTheDocument();

    // Check for quick reply buttons
    expect(screen.getByText('🔒 Check Escrow Status')).toBeInTheDocument();
  });

  it('should allow a user to send a message and receive a simulated AI response', async () => {
    setup();

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByTestId('send-button'); // Assuming MessageInput has a button with this test-id

    // User types and sends a message
    fireEvent.change(input, { target: { value: 'Tell me about escrow' } });
    fireEvent.click(sendButton);

    // The user's message should appear
    await screen.findByText('Tell me about escrow');

    // An AI typing indicator should appear
    expect(screen.getByText('Zimba AI is typing...')).toBeInTheDocument();

    // After a delay, the AI response should appear
    await waitFor(() => {
      expect(screen.getByText(/I can help you with escrow services!/i)).toBeInTheDocument();
    }, { timeout: 3000 }); // Wait for the 2s timeout in simulateAIResponse

    // Typing indicator should disappear
    expect(screen.queryByText('Zimba AI is typing...')).not.toBeInTheDocument();
  });

  it('should handle quick reply clicks', async () => {
    setup();
    const quickReplyButton = screen.getByText('💳 FlexPay Info');
    fireEvent.click(quickReplyButton);

    // The quick reply text should appear as a user message
    await screen.findByText('💳 FlexPay Info');

    // An AI response should follow
    await waitFor(() => {
      expect(screen.getByText(/FlexPay is our flexible payment solution!/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
