// MyCalendar.jsx
import React, { useState } from 'react'
import {
  Calendar,
  Views,
} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import localizer from './calendarLocalizer' // your dateFnsLocalizer setup

const DnDCalendar = withDragAndDrop(Calendar)

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Team Meeting',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
    },
  ])

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map(e =>
      e === event ? { ...e, start, end } : e
    )
    setEvents(updatedEvents)
  }

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
        style={{ backgroundColor: 'white' }}
      />
    </div>
  )
}

export default MyCalendar
