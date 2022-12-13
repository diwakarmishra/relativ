import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useEffect, useState } from 'react'
import Sidebar from "../sidebar/sidebar"
import moment from 'moment'
import axios from 'axios';

const localizer = momentLocalizer(moment)

const EventCalendar = (props) => {
    const [event, setEvent] = useState([])
    useEffect(() => {
        axios.get("/api/event")
        .then(res => {
            const result = res.data;
            console.log(res, 'result is here')
            if(result.status) {
                setEvent(result.data)
            }
        })
        .catch(err => {
            console.log(err , 'error is here')
        })
    }, [])
    function selectedEvent(event) {
        console.log(event, 'event is selected')
    }
    return (
        <div class="main-content">
        <div class="d-lg-flex">
            <Sidebar />
            <div style={{ marginTop : '10px', marginLeft : '20px', maxWidth: 'calc(100% - 250px)', width:'100%' }}>
                <Calendar
                    localizer={localizer}
                    events={event}
                    onSelectEvent = {(event) => selectedEvent(event)}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                />  
            </div>

        </div>
    </div>
    )

}


export default EventCalendar