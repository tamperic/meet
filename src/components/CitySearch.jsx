import React, { useEffect, useState } from 'react';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {

  const [showSuggestions, setShowSuggestions] = useState(false); // The default value of 'showSuggestions' is false, because it's not wanted to be shown unless the input field is “in focus.”
  const [query, setQuery] = useState(""); // Local state for the input field so that its value can be accessed.
  const [suggestions, setSuggestions] = useState([]); // Local state which will hold the list of suggestions.

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]); // Used the stringified value of the 'allLocation' prop as a dependency. This way, if there’s a change in it (an empty array that gets filled), the 'useEffect' code will be re-executed again, ensuring that the local suggestions state is updated.

  // This function will be used as the callback function of 'onChange', which is why it has the 'event' parameter in it.
  const handleInputChanged = (event) => {
    const value = event.target.value; // The function obtains the current value of the input field. 
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : []; //  Based on this value, the function filters the 'allLocations' array.

    setQuery(value); // Then sets the 'Query' local state to whatever the input value is.
    setSuggestions(filteredLocations); // Finally sets the 'suggestions' local state to the filtered locations array.
  
    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "The city you are looking for could not be found. Please try another city.";
    } else {
      infoText = "";
    }
    setInfoAlert(infoText);
  };

  // This function uses in the onClick event handler of the suggestion list item (<li>).
  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // To hide the list.
    setCurrentCity(value); // Update the 'handleItemClicked' function to call 'setCurrentCity' while passing the text content of the clicked suggestion item as the function’s argument to update the global state 'currentCity' of the 'App' component
    setInfoAlert("");
  };


  return (
    <div id="city-search">
      <label>Choose your nearest city:</label>
      <input 
        type="text" 
        className="city-input" 
        placeholder="Search for a city" 
        value={query} 
        onFocus={() => setShowSuggestions(true)} 
        onChange={handleInputChanged}
      />
      {showSuggestions ? 
        <ul className='suggestions'>
          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}
          <li onClick={handleItemClicked} key='See all cities'>
            <b>See all cities</b>
          </li>
        </ul> 
        : null}
    </div>
  );
}

export default CitySearch;