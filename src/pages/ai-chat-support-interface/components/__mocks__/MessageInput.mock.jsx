import React, { useState } from 'react';

// This is a simplified mock of MessageInput to allow testing interactions
// from the parent AIChatSupportInterface component.

let sendMessageCallback;
let micButton;
let messageInput;

const MockMessageInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  sendMessageCallback = (text) => {
    onSendMessage(text);
  };

  const handleMicClick = () => {
    // Simulate voice input by setting text after a delay
    setTimeout(() => {
        setInputValue("Tell me more about the security features of this property.");
    }, 2500);
  };

  messageInput = { value: inputValue }; // Expose value for test assertion

  return (
    <div>
      <input
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        data-testid="mock-input"
      />
      <button
        data-testid="send-button"
        onClick={() => onSendMessage(inputValue)}
      >
        Send
      </button>
      <button
        data-testid="mic-button"
        ref={node => micButton = node}
        onClick={handleMicClick}
      >
        Mic
      </button>
    </div>
  );
};

// Export a function to get access to the internal callbacks and elements for testing
export const __getMocks = () => ({
  sendMessage: sendMessageCallback,
  getMicButton: () => micButton,
  getMessageInput: () => messageInput,
});

export default MockMessageInput;
