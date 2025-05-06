import { loadFeature, defineFeature } from "jest-cucumber"; // 'loadFeature() 'is used to load a Gherkin file; 'defineFeature()' is used to define the code for that file (feature).
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";


const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    test('When user hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('user hasn\'t searched for any city', () => {
            // setup code - no code needed beacouse user didn't do anything yet
        });

        let AppComponent;
        when('the user opens the app', () => {
            // action code
            AppComponent = render(<App />);
        });

        then('the user should see a list of upcoming events.', async () => {
            // assertion code
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        let AppComponent;
        given('the main page is open', () => {
            // setup code
            AppComponent = render(<App />);
        });

        let CitySearchDOM;
        when('user starts typing in the city textbox', async () => {
            // action code
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(CitySearchInput, "Berlin");
        });

        then('the user should receive a list of cities (suggestions) that match what they\'ve typed.', async () => {
            // assertion code
            await waitFor(() => {
                const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
                expect(suggestionListItems).toHaveLength(2); // '2' for typed city, fro ex. "Berlin" and "See all cities"
            });
        });
    });

    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        let AppComponent;
        let AppDOM;
        let CitySearchDOM;
        let CitySearchInput;
        given('user was typing a city in the textbox', async () => {
            // setup code
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(CitySearchInput, "Berlin");
        });

        let suggestionListItems;
        and('the list of suggested cities is showing', async () => {
            // setup code
            await waitFor(() => {
                suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
                expect(suggestionListItems).toHaveLength(2); // '2' for typed city, for ex. "Berlin" and "See all cities"
            });
        });

        when('the user selects a desired city from the list', async () => {
            // action code
            const user = userEvent.setup();
            await user.click(suggestionListItems[0]);
        });

        then('their city should be changed to that city', () => {
            // assertion code
            expect(CitySearchInput.value).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city.', async () => {
            // additional assertions
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();

            // Filter the list of all events down to events located in Germany. 'CitySearchInput.value' should have the value 'Berlin, Germany' at this point
            const berlinEvents = allEvents.filter(event => event.location === CitySearchInput.value);
            expect(EventListItems).toHaveLength(berlinEvents.length);
        });
    });
})