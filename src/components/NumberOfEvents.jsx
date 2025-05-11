import React, { useState } from "react";


const NumberOfEvents = ({ setCurrentNOE, setErrorAlert, setInfoAlert }) => {
  const [defaultNumber, setDefaultNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value; // The function obtains the current value of the input field.
    setDefaultNumber(value);
    setCurrentNOE(value); // Update the 'handleInputChanged' function to call 'setCurrentNOE' while passing the content of the suggestion item as the function’s argument to update the global state 'CurrentNOE' of the 'App' component.
  
    let infoText;
    if (value.length === 0 || value == 0) {
      infoText = "Please enter a valid number between 1 and 100.";
    } else {
      infoText = "";
    }
    setInfoAlert(infoText);

    let errorText;
    if (value < 0 || value > 100 || isNaN(value)) {
      errorText = "Only whole numbers between 1 and 100 are allowed.";
    } else {
      errorText = "";
    }
    setErrorAlert(errorText);
  };


  return (
    <div id="number-of-events">
      <label>Number Of Events:</label>
      <input 
        type="number" 
        className="number-input" 
        placeholder="Filter events by number" 
        value={defaultNumber} 
        onChange={handleInputChanged}
      />
    </div>
  );
};


export default NumberOfEvents;