import React, { useState } from "react";


const NumberOfEvents = () => {
  const [defaultNumber, setDefaultNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value; // The function obtains the current value of the input field.
    setDefaultNumber(value);
  };


  return (
    <div id="number-of-events">
      <label>Number Of Events:</label>
      <input 
        type="number" 
        className="number-input" 
        placeholder="32 events shown by default" 
        value={defaultNumber} 
        onChange={handleInputChanged}
      />
    </div>
  );
};


export default NumberOfEvents;