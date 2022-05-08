import React from 'react';

export default function ScheduleApps(props) {
    const { currUser, scheduleAppsHeader } = props;
    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            {scheduleAppsHeader}
        </div>
    );
}