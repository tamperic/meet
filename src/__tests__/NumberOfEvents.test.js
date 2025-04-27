import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
    beforeEach(() => {
      NumberOfEventsComponent = render(<NumberOfEvents />);
    });
  
  
    test('renders number input', () => {
      const numberTextBox = NumberOfEventsComponent.queryByPlaceholderText('32 events shown by default');
      expect(numberTextBox).toBeInTheDocument();
      expect(numberTextBox).toHaveClass('number-input');
    });


    test('renders 32 events by default', () => {
      const numberTextBox = NumberOfEventsComponent.queryByPlaceholderText('32 events shown by default');
      expect(numberTextBox).toHaveValue(32);
    });


    test('updates list of events when user types in the number textbox', async () => {
      const user = userEvent.setup();
      const numberTextBox = NumberOfEventsComponent.queryByPlaceholderText('32 events shown by default'); 

      // user types 10 in textbox 
      await user.clear(numberTextBox); // Delete the current input value
      await user.type(numberTextBox, '10');
      expect(numberTextBox).toHaveValue(10);
    });
});
