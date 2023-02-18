import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'

export default class CustomCalendar extends React.Component {

  handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        dateClick={this.handleDateClick}
        selectable={true}
        weekends={true}
        headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
        // events={[
        //   { title: 'event 1', date: '2023-02-20' },
        //   { title: 'event 2', date: '2023-02-20' }
        // ]}
        eventSources={[
          {
            url: `http://localhost:5005/event`,
            method: 'GET',
            failure: function() {
              alert("there was an error fetching events")
            }
          }
        ]}
      />
    )
  }
};