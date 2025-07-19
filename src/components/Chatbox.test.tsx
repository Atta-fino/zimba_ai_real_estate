import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chatbox from './Chatbox';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    functions: {
      invoke: jest.fn().mockResolvedValue({ data: { reply: 'Hello!' }, error: null }),
    },
  })),
}));

// Mock Web Speech API
const mockSpeechRecognition = jest.fn(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    onresult: jest.fn(),
    onerror: jest.fn(),
}));
global.SpeechRecognition = mockSpeechRecognition;
global.webkitSpeechRecognition = mockSpeechRecognition;


test('renders chatbox correctly', () => {
  render(<Chatbox />);

  expect(screen.getByText('Send')).toBeInTheDocument();
});

test('sends a message', () => {
    render(<Chatbox />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByText('Send'));

    expect(screen.getByText('Hello')).toBeInTheDocument();
});

test('toggles voice input', () => {
    render(<Chatbox />);

    const micButton = screen.getByRole('button', { name: /mic/i });
    fireEvent.click(micButton);

    expect(mockSpeechRecognition).toHaveBeenCalled();
});
