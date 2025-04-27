import { render } from '@testing-library/react';
import React from 'react';
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