import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';
import App from '../App';


describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} />);
  });


  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });


  // This test ensures that no list (i.e., the suggestion list) is shown within the 'CitySearch' component by default (notice that '.not' is stated before '.toBeInTheDocument()').
  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });


  // This test ensures that the suggestion list appears when the city input field “gains focus” (i.e., when the input field is clicked). This user interaction is simulated through 'await user.click(cityTextBox);'. The function takes one argument, which is the targeted element. Finally, the test checks if the list exists and has the 'suggestions' class.
  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });


  // This test verifies that the list of suggestions is correctly rendered according to the query typed by the user in the city input field.
  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents(); // This variable contains the list of all events by calling the asynchronous function 'getEvents'.
    const allLocations = extractLocations(allEvents); // 'allLocations' contains the set of all possible distinct locations that will be extracted from 'allEvents'. This extraction is done by using a function 'extractLocations'.
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />); // The 'CitySearch' mock component has been re-rendered as a way to overwrite the original 'CitySearchComponent', but this time it has a new prop ('allLocations') passed to it.

    // user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin"); // Next, the process of a user typing “Berlin” in the city input field is simulated.

    // filter 'allLocations' to locations matching "Berlin"
    const suggestions = allLocations? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }): []; // Then, 'allLocations' is filtered down to the 'suggestions' array—the array that will only contain locations matching the query typed by the user in the city input field. 

    // get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1); // Then, the number of rendered suggestions is compared to the number of suggestions in the 'state' of 'CitySearch' plus one.  This is because you’ll be manually adding a “See all cities” suggestion at the end of the list (this means the minimum length of the <li>s will be 1).
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    } // Then, the rendered text in each list item is checked (using a 'for' loop) to ensure that it matches the corresponding value on the 'suggestions' array.
  });


  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents(); 
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={()  => { }} />);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe('<CitySearch /> integration', () => {

  test('renders suggestions list when the app is rendered', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
 
 
    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);
 
 
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
 
 
    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
    // or possible lso this way (using 'waitfor()'):
    // await waitFor(() => {
    //   const suggestionListItems = >within(CitySearchDOM).queryAllByRole('listitem');
    //   expect(suggestionListItems.length).toBe(allLocations.length + 1);
    //  });
 });
});