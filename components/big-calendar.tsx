'use client';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment'
import { calendarEvents } from '@/lib/data';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react';
import useOriginFull from '@/hooks/use-origin-full';
//import 'react-big-calendar/lib/sass/styles';
//import 'react-big-calendar/lib/addons/dragAndDrop/styles';



/*type events_data = {
    fields?:({startTime:any}&{endTime:any})[]
}*/

const localizer = momentLocalizer(moment)

export default function BigCalendar(){
    const origin = useOriginFull();
    const [view,set_view] = useState<View>(Views.WORK_WEEK);
    const handle_on_view_change = (selected_view:View)=>{
        set_view(selected_view);
    }
    console.log('Origin ',origin);
    return (
        
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "98%" }}
            views={['work_week',"day"]}
            view={view}
            defaultView='work_week'
            onView={handle_on_view_change}
            min={new Date(2025,1,0,8,0,0)}
            max={new Date(2025,1,10,17,0,0)}
          />
        
      )
}