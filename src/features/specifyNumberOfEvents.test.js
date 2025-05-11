import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn\'t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        given('user hasn\'t specified a number of events', () => {
            // setup code
        });

        let AppComponent;
        when('the user opens the app', async () => {
            // action code
            AppComponent = render(<App />);
        });

        then('the user should see 32 upcoming events by default', async () => {
            // assertion code
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('User can change the number of events displayed.', ({ given, when, then }) => {
        let AppComponent;
        let AppDOM;
        let EventListDOM;
        given('main page displayed 32 events by default', async () => {
            // setup code
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        when('the user enters a specific number in the number input field', async () => {
            // action code
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;

            const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
            const NumberOfEventsInput = within(NumberOfEventsDOM).queryByPlaceholderText('Filter events by number');
            
            await user.clear(NumberOfEventsInput); 
            await user.type(NumberOfEventsInput, '10');
        });

        then('the user should be able to see the specified number of upcoming events', async () => {
            // assertion code
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(10);
            });
        });
    });
});

