# **Meet App**

## Approach

- **PWA (Progressive Web Application)**: Instant loading, offline support, push notifications, "add to home screen" prompt, responsive design, and cross-platform compatibility.  
- **Serverless**: No backend maintenance, easy to scale, always available, no cost for idle time.  
- **TDD (Test-Driven Development) approach**: Tests written before the actual functionality in code.  
- **React**: Used to build the application.  
- **Google Calendar API**: Used to fetch upcoming events.  

---

## Features

### 1. Feature: Filter events by city

> **_User story:_**  
> *As a user, I should be able to filter events by city, so that I can see a list of events taking place in that city.*

- **Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities.
  - **Given** - User hasn’t searched for any city  
  - **When** - The user opens the app  
  - **Then** - The user should see a list of upcoming events

- **Scenario 2:** User should see a list of suggestions when they search for a city.
  - **Given** - The main page is open  
  - **When** - The user starts typing in the city textbox  
  - **Then** - The user should receive a list of cities (suggestions) that match what they’ve typed

- **Scenario 3:** User can select a city from the suggested list.
  - **Given** - User was typing a city and the list of suggested cities is showing  
  - **When** - The user selects a desired city from the list  
  - **Then** - The app should display the upcoming events in that selected city  

---

### 2. Feature: Show/Hide event details

> **_User story:_**  
> *As a user, I should be able to click a button, so that I can see more/less details about a certain event.*

- **Scenario 1:** An event element is collapsed by default.
  - **Given** - The user has opened the app or set the event filters (by city and/or number of events)  
  - **When** - The app is listing upcoming events  
  - **Then** - The user should see event elements that are collapsed by default  

- **Scenario 2:** User can expand an event to see details.
  - **Given** - The app has displayed a list of collapsed event elements  
  - **When** - The user clicks the button on a certain event  
  - **Then** - The user will be able to see more details about that event  

- **Scenario 3:** User can collapse an event to hide details.
  - **Given** - The user expanded an event and viewed details  
  - **When** - The user clicks the button to hide details  
  - **Then** - The event element should collapse and show fewer details  

---

### 3. Feature: Specify number of events

> **_User story:_**  
> *As a user, I should be able to enter a number, so that I can see a list of only that number of events.*

- **Scenario 1:** When user hasn’t specified a number, 32 events are shown by default.
  - **Given** - User hasn’t specified a number of events  
  - **When** - The user opens the app  
  - **Then** - The user should see 32 upcoming events by default  

- **Scenario 2:** User can change the number of events displayed.
  - **Given** - The main page displayed 32 events by default  
  - **When** - The user enters a specific number in the number input field  
  - **Then** - The user should be able to see the specified number of upcoming events  

---

### 4. Feature: Use the app when offline

> **_User story:_**  
> *As a user, I should be able to use the app so that I can still get cached data even when there’s no internet connection.*

- **Scenario 1:** Show cached data when there’s no internet connection.
  - **Given** - The user has lost the internet connection  
  - **When** - The user is still using or opens the app  
  - **Then** - The app should show cached data when offline  

- **Scenario 2:** Show error when user changes settings (city, number of events).
  - **Given** - The app showed cached data offline  
  - **When** - The user changes the event filter (city, number of events)  
  - **Then** - The app should throw an error indicating that the user needs an internet connection for that action  

---

### 5. Feature: Add an app shortcut to the home screen

> **_User story:_**  
> *As a user, I should be able to add an app shortcut to the home screen, so that I can access the app faster.*

- **Scenario 1:** Show cached data when there’s no internet connection.
  - This scenario is handled by the user’s OS, not the app  

---

### 6. Feature: Display charts visualizing event details

> **_User story:_**  
> *As a user, I should be able to view charts so that I can have a quick visual overview of upcoming events in each city.*

- **Scenario 1:** Show a chart with the number of upcoming events in each city.
  - **Given** - The user opened the app  
  - **When** - The user is on the main page  
  - **Then** - The user should see a chart visualizing the number of upcoming events in each city  

---
