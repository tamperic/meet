import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        let AppComponent;
        given('user has opened the app or set the event filters (by city and/or number of events)', () => {
            // setup code
            AppComponent = render(<App />);
        });

        when('app is listing upcoming events', async () => {
            // action code
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        then('the user should see event elements that are collapsed by default', () => {
            // assertion code
            const AppDOM = AppComponent.container.firstChild;

            const expandedDetails = AppDOM.querySelector('.event-details');
            expect(expandedDetails).not.toBeInTheDocument();
        });
    });

    test('User can expand an event to see details.', ({ given, when, then }) => {
        let AppComponent;
        given('app has displayed a list of collapsed event elements', () => {
            // setup code
            AppComponent = render(<App />);
        });

        when('user clicks the button on a certain event', async () => {
            // action code
            const user = userEvent.setup();
            const moreDetailsBtn = await AppComponent.findAllByText('More details');
            await user.click(moreDetailsBtn[0]);
        });

        then('the user will be able to see more details about that event', async () => {
            // assertion code
            const expandedDetails = await AppComponent.findByTestId('event-details');
            expect(expandedDetails).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide details.', ({ given, when, then }) => {
        let AppComponent;
        given('user expanded an event and viewed details', async () => {
            // setup code
            AppComponent = render(<App />);
            const user = userEvent.setup();

            const moreDetailsBtn = await AppComponent.findAllByText('More details');
            await user.click(moreDetailsBtn[0]);

            const expandedDetails = await AppComponent.findByTestId('event-details');
            expect(expandedDetails).toBeInTheDocument();
        });

        when('the user clicks the button to hide details', async () => {
            // action code
            const user = userEvent.setup();
            const lessDetailsBtn = await AppComponent.findAllByText('Less details');
            await user.click(lessDetailsBtn[0]);
        });

        then('event element should collapse and show fewer details', async () => {
            // assertion code
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const expandedDetails = AppDOM.querySelector('.event-details');
                expect(expandedDetails).not.toBeInTheDocument();
            });
        });
    });
});