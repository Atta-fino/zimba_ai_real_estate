import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OfflineState from '../OfflineState';

jest.mock('../../AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);


describe('OfflineState Component', () => {
  it('should render the offline message', () => {
    render(<OfflineState />);
    expect(screen.getByText('You appear to be offline.')).toBeInTheDocument();
    expect(screen.getByText(/We're having trouble connecting to the internet./i)).toBeInTheDocument();
  });

  it('should render a retry button if onRetry callback is provided', () => {
    const handleRetry = jest.fn();
    render(<OfflineState onRetry={handleRetry} />);

    const retryButton = screen.getByText('Try to Reconnect');
    expect(retryButton).toBeInTheDocument();
    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('should not render a retry button if onRetry is not provided', () => {
    render(<OfflineState />);
    expect(screen.queryByText('Try to Reconnect')).not.toBeInTheDocument();
  });
});
