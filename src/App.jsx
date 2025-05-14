import React, { useEffect, useState } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32); 
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities"); // Represents the value of the queried local state that’s in 'CitySearch.js' once the user selects one of the suggestion items.
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  //  Call 'fetchData' in 'useEffect()', because want the list to be populated as soon as the 'App' component is mounted.
  useEffect(() => {
    // Check the value of 'navigator.onLine'
    let warningText;
    if (navigator.onLine) {
      warningText = "";
    } else {
      warningText = "You are currently using the app offline by getting data from the local storage.";
    }
    setWarningAlert(warningText);
    fetchData();
  }, [currentCity, currentNOE]);  // the callback of 'useEffect' will be called whenever it detects a change in 'currentCity'. This callback calls 'fetchData()' inside it. This will keep the events list up to date!

  // The 'events' state is currently empty. This function is sed to populate the 'events' state with the events list I’ll fetch.
  const fetchData = async () => {
    const allEvents = await getEvents(); //  Called 'getEvents()' (from api.js) to fetch the list of events objects, ...
    const filteredEvents = currentCity === "See all cities" ? 
      allEvents : allEvents.filter(event => event.location === currentCity); // ...filters out the list of events based on the value of the 'currentCity' state, in the case that it contains a value other than "See all cities", otherwise, all events will be rendered.
    setEvents(filteredEvents.slice(0, currentNOE));  // ...then call 'setEvents(allEvents.slice(0, currentNOE));' which takes the first 32 events.
    setAllLocations(extractLocations(allEvents)); // Initialized the 'allLocations' state in the 'fetchData()' function.
  }

  return (
    <div className='App'>
      <div className='alerts-container'>
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} 
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents 
        setCurrentNOE={setCurrentNOE} 
        setErrorAlert={setErrorAlert}
        setInfoAlert={setInfoAlert}
        />
      <EventList events={events} />
    </div>
  );
 }
 
 export default App;
 
