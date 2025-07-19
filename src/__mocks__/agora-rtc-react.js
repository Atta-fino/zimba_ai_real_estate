const React = require('react');
module.exports = {
    createClient: jest.fn(() => ({
        on: jest.fn(),
        join: jest.fn(),
        publish: jest.fn(),
        subscribe: jest.fn(),
    })),
    createMicrophoneAndCameraTracks: jest.fn(() => ({
        ready: true,
        tracks: [{}, {}]
    })),
    AgoraVideoPlayer: () => React.createElement('div', { 'data-testid': 'video-player' })
};
