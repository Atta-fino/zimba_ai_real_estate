import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingFlowController from './OnboardingFlowController';

test('renders onboarding flow correctly', () => {
  render(<OnboardingFlowController />);

  // Step 1
  expect(screen.getByText('Create your account')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Next'));

  // Step 2
  expect(screen.getByText('Select your country and language')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Next'));

  // Step 3
  expect(screen.getByText('What is your role?')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Next'));

  // Step 4
  expect(screen.getByText('Trust & Escrow')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Finish'));
});
