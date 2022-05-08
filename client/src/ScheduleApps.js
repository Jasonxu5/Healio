import React from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

// Because Calendar is hard to use with Tailwind...
// ...I have to painfully relearn normal CSS

export default function ScheduleApps(props) {
    const { currUser, scheduleAppsHeader } = props;
    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            {scheduleAppsHeader}
            <AppCalendar currUser={currUser} />
        </div>
    );
}

function AppCalendar(props) {
    const { currUser } = props;
    return <Calendar
        className="animate-popup h-screen"
        prev2Label={null}
        next2Label={null}
        view='month'
        minDetail="month"
        tileClassName="transition h-[14.2vh]"
    />;
}