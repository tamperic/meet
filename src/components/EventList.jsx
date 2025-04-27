import React from "react";
import Event from "./Event";

//  Extracted the expected prop 'events' from the component's props object:
const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events? events.map((event) => (
        <li key={event.id}>
          <Event event={event} /> 
        </li>
      )) : null}
    </ul>
  );
}
// To make the accessibility-focused version of the test pass, there are 2 options:
// 1. Add role="list" to <div id="event-list"></div>; or
// 2. Change <div id="event-list"></div> to <ul id="event-list"></ul>. This will work because <ul> is assigned the list role by default; you don't need to add role="list" to it.

// Added .map() loop that loops over the 'events' prop, and in each iteration, render an '<Event />' component (which will internally render the <li></li> list item element).

// The test failed because when the EventList component is tested in an isolated environment (hence the name “unit testing”), the component in the test doesn’t know if the App component will pass the events prop or not. So, you might be extracting an events prop that doesn't exist at all. 
// There are 2 options to resolve this: 
// 1. Replace 'events' with a default empty array within the 'EventList' component itself when the prop is extracted. -> ({ events = [] })
// 2. Make sure that the '.map()' loop is only executed if 'events' is defined. -> {events? events.map(event => <Event event={event} />): null}
// Second option means -> if 'events' is a truthy value (e.g., not 'null', 'undefined', '0', 'false', etc.), then return the result of the '.map()' loop. If it’s not a truthy value, render a 'null' (i.e., render nothing).


export default EventList;