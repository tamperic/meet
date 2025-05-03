import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from './../App';


describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument(); // Check if there’s an element that has the id of 'event-list' inside the AppDOM and that exists in the document.
    // The function '.toBeInTheDocument()' is a matcher function provided by the @testing-library/jest-dom package. The value passed to expect should match the criteria defined by the matcher function. Matcher functions are always chained to expect().
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

// This test involves checking whether clicking on one of the suggestions will display the correct list of events for the selected city (after typing sth. into the city text input box).
describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    // 'userEvent' is set, and the 'App' component and its DOM are mocked.
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
 
    // A reference to the 'CitySearch' component root DOM node is initialized, then a query is performed to find the city input text box in it.
    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
 
    // This code simulates typing “Berlin” in the city textbox and then clicking on the list item that contains “Berlin, Germany”.
    // Typing “Berlin” will filter the suggestions list to only two: “Berlin, Germany” and hardcoded “See all cities”.
    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);
 
    // This code queries '#event-list' (the 'EventList' component root node DOM), and finds what 'Event' list item is rendered inside it.
    // It’s essential to do this query after clicking on the suggestion list because it's wanted to expect that the 'EventList' will be affected after selecting that suggestion list item.
    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');  
 
    // Gets a list of all events from the mock data that are located in “Berlin, Germany”.
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );
 
    // Comparing the number of events located in "Berlin, Germany" with the array of rendered Event list items, expecting them to have the same length.
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    // Looping over the filtered event list items with 'allRenderedEventItems', making sure that all of the items contain the text “Berlin, Germany”. 
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
});