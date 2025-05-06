Feature: Show/Hide event details
    Scenario: An event element is collapsed by default.
        Given user has opened the app or set the event filters (by city and/or number of events)
        When app is listing upcoming events
        Then the user should see event elements that are collapsed by default

    Scenario: User can expand an event to see details.
        Given app has displayed a list of collapsed event elements
        When user clicks the button on a certain event
        Then the user will be able to see more details about that event

    Scenario: User can collapse an event to hide details.
        Given user expanded an event and viewed details
        When the user clicks the button to hide details
        Then event element should collapse and show fewer details