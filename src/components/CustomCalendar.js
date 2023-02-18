import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

export default class CustomCalendar extends React.Component {
  handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={this.handleDateClick}
        weekends={false}
        events={[
          { title: 'event 1', date: '2023-02-20' },
          { title: 'event 2', date: '2023-02-20' }
        ]}
      />
    )
  }
};