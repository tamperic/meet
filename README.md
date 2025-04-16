# Meet App


## Features

1. Feature: Filter events by city
  ***User story:***
  *As a user,
  I should be able to filter events by city,
  So that I can see a list of events taking place in that city.*
  - 1. Scenario: When user hasn’t searched for a city, show upcoming events from all cities.
    - Given - user hasn’t searched for any city;
    - When - the user opens the app;
    - Then - the user should see a list of upcoming events.
  - 2. Scenario: User should see a list of suggestions when they search for a city.
    - Given - the main page is open;
    - When - user starts typing in the city textbox;
    - Then - the user should receive a list of cities (suggestions) that match what they’ve typed.
  - 3. Scenario: User can select a city from the suggested list.
    - Given - user was typing a certain city in the textbox and the list of suggested cities is showing;
    - When - the user selects a desired city from the list;
    - Then - the app should display the upcoming events in that selected city.
2. Feature: Show/Hide event details
  ***User story:***
  *As a user,
  I should be able to click a button,
  So that I can see more/less details about certain event.*
  - 1. Scenario: An event element is collapsed by default.
    - Given - the user has opened the app or set the event filters (by city or/and by number of event);
    - When - the app is listing upcoming events;
    - Then - the user should see an event elements that are collapsed by default, showing less details about that event.
  - 2. Scenario: User can expand an event to see details.
    - Given - the app has displayed a list of collapsed event elements;
    - When - the user clicks button of certain event element;
    - Then - the user will be able see more details about that event.
  - 3. Scenario: User can collapse an event to hide details.
    - Given - user expanded an event and viewed details;
    - When - the user clicks the button to hide details;
    - Then - an event elements should collapse and show less details about that event.
3. Feature: Specify number of events
  ***User story:***
  *As a user,
  I should be able to enter a number,
  So that I can see a list of only that number of events.*
  - 1. Scenario: When user hasn’t specified a number, 32 events are shown by default.
    - Given - user hasn’t specified a number of events, that he wants to see;
    - When - the user opens the app;
    - Then - the user should see 32 upcoming events by default.
  - 2. Scenario: User can change the number of events displayed.
    - Given - the main page displayed 32 events by default;
    - When - the user enters a specific number in the number input field;
    - Then - the user should be able to see the specified number of upcoming events.
4. Feature: Use the app when offline
  ***User story:***
  *As a user,
  I should be able to use app,
  So that I can still get cached data even when there’s no internet connection.*
  - 1. Scenario: Show cached data when there’s no internet connection.
    - Given - user has lost the internet connection;
    - When -	the user is still using/opens the app;
    - Then - the app should show cached data when offline.
  - 2. Scenario: Show error when user changes settings (city, number of events).
    - Given - the app showed cached data offline;
    - When - the user changes the event filter (city, number of events);
    - Then - the app should throw an error indicating that the user needs an internet connection for that action.
5. Feature: Add an app shortcut to the home screen
  ***User story:***
  *As a user,
  I should be able add an app shortcut to the home screen,
  So that I can faster access the app.*
  - 1. Scenario: Show cached data when there’s no internet connection.
    - This scenario is handled by user’s OS, not by app.
6. Feature: Display charts visualizing event details
  ***User story:***
  *As a user,
  I should be able to view charts,
  So that I can have a quick visual overview of upcoming events in each city.*
  - 1. Scenario: Show a chart with the number of upcoming events in each city.
    - Given - the user opened the app;
    - When - the user is on the main page;
    - Then - the user should see a chart visualizing the number of upcoming events in each city.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
