import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';

describe('<EventList /> component', () => {
  let EventListComponent;
  
  beforeEach(() => {
   EventListComponent = render(<EventList />); // Inside the test, first is defined a handler/reference to a mock 'EventList' component.
  });


  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument(); // Then test if there’s an element inside it that has the role "list" “in the document.”
  });


  // This test uses moch event data from 'mock-data.js', obtained through calling 'getEvents', which is located in 'api.js'.
  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length); // it can also be written like this: expect(EventListComponent.getAllByRole("listitem").length).toBe(allEvents.length);
  });
});


describe('<EventList/> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });
 
});