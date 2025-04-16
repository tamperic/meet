# **Meet App**

## Approach 
- **PWA (Progressive Web Application)**: instant loading, offline support, push notifications, "add to home screen" prompt, responsive design, and cross-platform compatibility.
- **Serverless**: no backend maintenance, easy to scale, always available, no cost for idle time.
- **TDD (Test-Driven Development) approach**: tests written before the actual functionality in code.
- **React**: used to build the application.
- **Google Calendar API**: used to fetch upcoming events.

## Features

### 1. Feature: Filter events by city
  ***User story:***
  *As a user,
  I should be able to filter events by city,
  So that I can see a list of events taking place in that city.*
  - **Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities.
    - **Given** - user hasn’t searched for any city;
    - **When** - the user opens the app;
    - **Then** - the user should see a list of upcoming events.
  - **Scenario 2:** User should see a list of suggestions when they search for a city.
    - **Given** - the main page is open;
    - **When** - user starts typing in the city textbox;
    - **Then** - the user should receive a list of cities (suggestions) that match what they’ve typed.
  - **Scenario 3:** User can select a city from the suggested list.
    - **Given** - user was typing a certain city in the textbox and the list of suggested cities is showing;
    - **When** - the user selects a desired city from the list;
    - **Then** - the app should display the upcoming events in that selected city.
### 2. Feature: Show/Hide event details
  ***User story:***
  *As a user,
  I should be able to click a button,
  So that I can see more/less details about certain event.*
  - **Scenario 1:** An event element is collapsed by default.
    - **Given** - the user has opened the app or set the event filters (by city or/and by number of event);
    - **When** - the app is listing upcoming events;
    - **Then** - the user should see an event elements that are collapsed by default, showing less details about that event.
  - **Scenario 2:** User can expand an event to see details.
    - **Given** - the app has displayed a list of collapsed event elements;
    - **When** - the user clicks button of certain event element;
    - **Then** - the user will be able see more details about that event.
  - **Scenario 3:** User can collapse an event to hide details.
    - **Given** - user expanded an event and viewed details;
    - **When** - the user clicks the button to hide details;
    - **Then** - an event elements should collapse and show less details about that event.
### 3. Feature: Specify number of events
  ***User story:***
  *As a user,
  I should be able to enter a number,
  So that I can see a list of only that number of events.*
  - **Scenario 1:** When user hasn’t specified a number, 32 events are shown by default.
    - **Given** - user hasn’t specified a number of events, that he wants to see;
    - **When** - the user opens the app;
    - **Then** - the user should see 32 upcoming events by default.
  - **Scenario 2:** User can change the number of events displayed.
    - **Given** - the main page displayed 32 events by default;
    - **When** - the user enters a specific number in the number input field;
    - **Then** - the user should be able to see the specified number of upcoming events.
### 4. Feature: Use the app when offline
  ***User story:***
  *As a user,
  I should be able to use app,
  So that I can still get cached data even when there’s no internet connection.*
  - **Scenario 1:** Show cached data when there’s no internet connection.
    - **Given** - user has lost the internet connection;
    - **When** -	the user is still using/opens the app;
    - **Then** - the app should show cached data when offline.
  - **Scenario 2:** Show error when user changes settings (city, number of events).
    - Given - the app showed cached data offline;
    - **When** - the user changes the event filter (city, number of events);
    - **Then** - the app should throw an error indicating that the user needs an internet connection for that action.
### 5. Feature: Add an app shortcut to the home screen
  ***User story:***
  *As a user,
  I should be able add an app shortcut to the home screen,
  So that I can faster access the app.*
  - **Scenario 1:** Show cached data when there’s no internet connection.
    - This scenario is handled by user’s OS, not by app.
### 6. Feature: Display charts visualizing event details
  ***User story:***
  *As a user,
  I should be able to view charts,
  So that I can have a quick visual overview of upcoming events in each city.*
  - **Scenario 1:** Show a chart with the number of upcoming events in each city.
    - **Given** - the user opened the app;
    - **When** - the user is on the main page;
    - **Then** - the user should see a chart visualizing the number of upcoming events in each city.

## Technologies Used
- **React**
