import React, { useState } from "react";
import PropTypes from "prop-types";

const Event = ({ event }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); 

  if (!event) return null; // Return nothing if no event is passed

  const handleToggleDetails  = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="event">
      <h2>{event.summary}</h2>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Start:</strong> {new Date(event.start.dateTime).toLocaleString()}</p>
      {!isCollapsed && (
        <div className="event-details" data-testid="event-details">
          <p><strong>End:</strong> {new Date(event.end.dateTime).toLocaleString()}</p>
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>{event.creator.email}</strong> has created this event on {new Date(event.created).toLocaleString()}</p>
        </div>
      )}

      <button className="details-btn" onClick={handleToggleDetails}>{ isCollapsed ? 'More details' : 'Less details' }</button>
    </div>
  );
};

// PropTypes for validation
Event.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    start: PropTypes.shape({
      dateTime: PropTypes.string.isRequired,
    }).isRequired,
    end: PropTypes.shape({
      dateTime: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
    created: PropTypes.string.isRequired,
  })
};


export default Event;
