import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RemoteTourRequest from './RemoteTourRequest';

// Mock react-datepicker
jest.mock('react-datepicker', () => {
    return function DatePicker(props) {
        return <input data-testid="datepicker" value={props.selected} onChange={e => props.onChange(e.target.value)} />
    }
})

test('renders remote tour request correctly', () => {
  global.alert = jest.fn();
  render(<RemoteTourRequest propertyId="123" />);

  expect(screen.getByText('Request a Remote Tour')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Request Tour'));
});
