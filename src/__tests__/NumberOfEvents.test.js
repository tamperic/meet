import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents 
        setCurrentNOE={() => { }} 
        setErrorAlert={() => { }}
        setInfoAlert={() => { }}
      />
    );
  });
  
  
  test('renders number input', () => {
    const numberBox = NumberOfEventsComponent.queryByPlaceholderText('Filter events by number');
    expect(numberBox).toBeInTheDocument();
    expect(numberBox).toHaveClass('number-input');
  });


  test('renders 32 events by default', () => {
    const numberBox = NumberOfEventsComponent.queryByPlaceholderText('Filter events by number');
    expect(numberBox).toHaveValue(32);
  });


  test('updates list of events when user types in the numberbox', async () => {
    const user = userEvent.setup();
    const numberBox = NumberOfEventsComponent.queryByPlaceholderText('Filter events by number'); 

    // user types 10 in textbox 
    await user.clear(numberBox); // Delete the current input value
    await user.type(numberBox, '10');
    expect(numberBox).toHaveValue(10);
  });
});

describe('<NumberOfEvents /> integration', () => {

  // The intergration test between: App.test.js/NumberOfEvents.test.js/EventList.test.js.
  test('renders a list of events matching the inputed number of events', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput = within(NumberOfEventsDOM).queryByPlaceholderText('Filter events by number');

    await user.clear(NumberOfEventsInput); 
    await user.type(NumberOfEventsInput, '10');

    const EventListDOM = AppDOM.querySelector('#event-list');

    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(10);
    });
  });
});

