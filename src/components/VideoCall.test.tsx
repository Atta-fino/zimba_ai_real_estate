import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoCall from './VideoCall';

// Mock agora-rtc-react
jest.mock('agora-rtc-react', () => {
    const useMicrophoneAndCameraTracks = jest.fn(() => ({
        ready: true,
        tracks: [{}, {}]
    }));
    return {
        createClient: jest.fn(() => ({
            on: jest.fn(),
            join: jest.fn(),
            publish: jest.fn(),
            subscribe: jest.fn(),
        })),
        createMicrophoneAndCameraTracks: useMicrophoneAndCameraTracks,
        AgoraVideoPlayer: () => <div data-testid="video-player" />
    }
});

test('renders video call correctly', () => {
  render(<VideoCall channel="test" token="test" appId="test" />);

  expect(screen.getByTestId('video-player')).toBeInTheDocument();
});
