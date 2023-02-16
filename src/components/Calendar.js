import { React, useState } from 'react'
import Calendar from 'react-calendar'
import { Navigate } from 'react-router-dom'

function Calendar( { children } ) {

    const [date, setDate] = useState(new Date());

    return (
         <div>
            <Calendar onChange={setDate} value={date} maxDate={new Date(2024, 0, 1)} width={100%}></Calendar>
         </div>
  )
}

export default Calendar;