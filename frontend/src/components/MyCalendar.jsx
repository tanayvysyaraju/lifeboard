import React from 'react';
import {
  Calendar,
  Views,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import localizer from './calendarLocalizer';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const DnDCalendar = withDragAndDrop(Calendar);

const MyCalendar = ({ events, setEvents }) => {
  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map(e =>
      e === event ? { ...e, start, end } : e
    );
    setEvents(updatedEvents);
  };

  // Render popover on hover
  const eventPropGetter = (event) => ({
    style: { cursor: 'pointer' },
  });

  const components = {
    event: ({ event }) => (
      <OverlayTrigger
        placement="top"
        overlay={
          <Popover id={`popover-${event.title}`}>
            <Popover.Header as="h3">{event.title}</Popover.Header>
            <Popover.Body>{event.info || 'No info provided'}</Popover.Body>
          </Popover>
        }
      >
        <div>{event.title}</div>
      </OverlayTrigger>
    ),
  };

  return (
    <div className="container mt-4" style={{ height: '80vh' }}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        onEventDrop={handleEventDrop}
        resizable
        defaultView={Views.WEEK}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        tooltipAccessor="info"
        components={components}
        eventPropGetter={eventPropGetter}
        style={{ backgroundColor: 'white' }}
      />
    </div>
  );
};

export default MyCalendar;
