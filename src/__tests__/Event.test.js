import React from 'react';
import { render } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';


describe('<Event /> component', () => {
  let EventComponent;
  let event;
  let allEvents;

  beforeEach(async () => {
    allEvents = await getEvents();
    event = allEvents[0];
    EventComponent = render(<Event event={event} />);
  });


  test('by default, event\'s details section should be hidden', () => {
    const formattedStartDate = new Date(event.start.dateTime).toLocaleString();

    // should be displayed
    expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
    expect(EventComponent.queryByText(formattedStartDate)).toBeInTheDocument();
    expect(EventComponent.queryByText('More details')).toBeInTheDocument();

    // shouldn't be displayed
    expect(EventComponent.queryByText('Less details')).not.toBeInTheDocument();
  });


  test('shows the details section when the user clicks on the "More details" button', async () => {
    const user = userEvent.setup();
    await user.click(EventComponent.queryByText('More details'));

  
    const expectText = (text) => {
      const element = EventComponent.queryByText(text); // Try to find a DOM element in the rendered component that contains the given 'text'. If it finds returns HTMLELement, if not returns null.
      
      // Check if a matching element was found
      if (element) {
        expect(element).toBeInTheDocument();
      } // If found, it runs the expectation, if not it skips expectation, avoiding test failures caused by trying to run '.toBeInTheDocument()' on 'null'
    };

    if (event.end?.dateTime) {
      const formattedEndDate = new Date(event.end.dateTime).toLocaleString();
      expectText(formattedEndDate);
    }
    
    if (event.description) {
      expectText(event.description);
    }
    
    if (event.creator?.email) {
      expectText(event.creator.email);
    }
    
    if (event.created) {
      const formattedCreatedDate = new Date(event.created).toLocaleString();
      expectText(formattedCreatedDate);
    }
    
    expect(EventComponent.queryByText('More details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('Less details')).toBeInTheDocument();
  });

  
  test('hides the details section when the user clicks on the "Less details" button', async () => {
    const user = userEvent.setup();

    await user.click(EventComponent.queryByText('More details')); // Expand first
    await user.click(EventComponent.queryByText('Less details')); // Then hide

    const expectText = (text) => {
      const element = EventComponent.queryByText(text);
      if (element) {
        expect(element).not.toBeInTheDocument();
      }
    };

    if (event.end?.dateTime) {
      const formattedEndDate = new Date(event.end.dateTime).toLocaleString();
      expectText(formattedEndDate);
    }
    
    if (event.description) {
      expectText(event.description);
    }
    
    if (event.creator?.email) {
      expectText(event.creator.email);
    }
    
    if (event.created) {
      const formattedCreatedDate = new Date(event.created).toLocaleString();
      expectText(formattedCreatedDate);
    }
    
    expect(EventComponent.queryByText('Less details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('More details')).toBeInTheDocument();
  });

});

