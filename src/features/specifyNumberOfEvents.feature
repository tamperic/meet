Feature: Specify number of events
    Scenario: When user hasn't specified a number, 32 events are shown by default.
        Given user hasn't specified a number of events
        When the user opens the app
        Then the user should see 32 upcoming events by default

    Scenario: User can change the number of events displayed.
        Given main page displayed 32 events by default
        When the user enters a specific number in the number input field
        Then the user should be able to see the specified number of upcoming events