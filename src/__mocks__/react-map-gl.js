const React = require('react');
module.exports = {
    Map: (props) => React.createElement('div', { 'data-testid': 'mapbox', ...props }),
    Marker: (props) => React.createElement('div', { 'data-testid': 'marker', ...props }),
    Popup: (props) => React.createElement('div', { 'data-testid': 'popup', ...props }),
    FlyToInterpolator: class {}
};
