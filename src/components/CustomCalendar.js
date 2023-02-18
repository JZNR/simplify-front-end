import { React, useState } from 'react'
import Calendar from 'react-calendar'
import { Navigate } from 'react-router-dom'

function CustomCalendar() {

    const [date, setDate] = useState(new Date());

    return (
         <div>
            <Calendar 
            onChange={setDate} 
            value={date} 
            view={'year'}
            selectRange={true}
            />
         </div>
  )
}

export default CustomCalendar;