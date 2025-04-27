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
    const formattedEndDate = new Date(event.end.dateTime).toLocaleString();
    //const formattedCreatedDate = new Date(event.created).toLocaleString();

    await user.click(EventComponent.queryByText('More details'));

    expect(EventComponent.queryByText(formattedEndDate)).toBeInTheDocument();
    //expect(EventComponent.queryByText(event.description)).toBeInTheDocument();
    expect(EventComponent.queryByText(event.creator.email)).toBeInTheDocument();
    //expect(EventComponent.queryByText(formattedCreatedDate)).toBeInTheDocument();
    expect(EventComponent.queryByText('More details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('Less details')).toBeInTheDocument();
  });

  
  test('hides the details section when the user clicks on the "Less details" button', async () => {
    const user = userEvent.setup();
    await user.click(EventComponent.queryByText('Less details'));

    const formattedCreatedDate = new Date(event.created).toLocaleString();
    const formattedEndDate = new Date(event.end.dateTime).toLocaleString();

    expect(EventComponent.queryByText(formattedEndDate)).not.toBeInTheDocument();
    expect(EventComponent.queryByText(event.description)).not.toBeInTheDocument();
    expect(EventComponent.queryByText(event.creator.email)).not.toBeInTheDocument();
    expect(EventComponent.queryByText(formattedCreatedDate)).not.toBeInTheDocument();
    expect(EventComponent.queryByText('Less details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('More details')).toBeInTheDocument();
  });

});

