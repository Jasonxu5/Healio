import React, { useState } from 'react';

export default function ViewApps(props) {
    const { currUser, viewAppsHeader } = props;
    const [currSearch, setCurrSearch] = useState('');
    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            {viewAppsHeader}
            <FilterApp searchCallback={setCurrSearch} />
            <AppList currUser={currUser} currSearch={currSearch} />
        </div>
    );
}

function FilterApp(props) {
    const { searchCallback } = props;

    const handleTextChange = (event) => {
        searchCallback(event.target.value.toLowerCase());
    };
    return (
        <div>
            <form className="animate-popup flex gap-3 mt-5 mb-10">
                <label className="absolute left-[-100vw]">Type something here...</label>
                <input className="p-[12px] w-[250px] rounded-[15px] bg-grey placeholder:text-black"
                    onChange={handleTextChange} placeholder={'Search for appointments...'} aria-label="Filter your appointments" autoComplete="off" />
            </form>
        </div>
    )
}

function AppList(props) {
    const { currUser, currSearch } = props;
    const today = new Date();

    const upcomingApps = currUser.appointments.filter((app) => {
        return today <= app.date && app.name.toLowerCase().includes(currSearch);
    });
    const upcomingAppsArray = upcomingApps.map((app, index) => {
        return <Appointment app={app.name} dateObject={app.date} doc={app.doctor} key={index} />;
    });

    const pastApps = currUser.appointments.filter((app) => {
        return today > app.date && app.name.toLowerCase().includes(currSearch);
    });
    const pastAppsArray = pastApps.map((app, index) => {
        return <Appointment app={app.name} dateObject={app.date} doc={app.doctor} key={index} />;
    });

    return (
        <div className="animate-popup">
            <h2 className="font-heading text-2xl">Upcoming Appointments</h2>
            {!upcomingAppsArray.every(app => app === undefined) ? (
                <div className="sm:grid-cols-[150px,250px] md:grid-cols-[150px,300px,350px] grid grid-cols-[220px,350px,400px] font-heading text-xl mt-2 ml-5">
                    <h3>Date</h3>
                    <h3>Appointment</h3>
                    <h3 className="sm:hidden">Doctor</h3>
                </div>
            ) : null}
            <div className="flex flex-col">
                {!upcomingAppsArray.every(app => app === undefined) ? upcomingAppsArray : <p className="my-4">No upcoming appointments.</p>}
            </div>
            <h2 className="font-heading text-2xl mt-12">Past Appointments</h2>
            {!pastAppsArray.every(app => app === undefined) ? (
                <div className="sm:grid-cols-[150px,250px] md:grid-cols-[150px,300px,350px] grid grid-cols-[220px,350px,400px] font-heading text-xl mt-2 ml-5">
                    <h3>Date</h3>
                    <h3>Appointment</h3>
                    <h3 className="sm:hidden">Doctor</h3>
                </div>
            ) : null}
            <div className="flex flex-col">
                {!pastAppsArray.every(app => app === undefined) ? pastAppsArray : <p className="my-4">No past appointments.</p>}
            </div>
        </div>
    );
}

function Appointment(props) {
    const { app, dateObject, doc } = props;
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();
    const year = dateObject.getFullYear();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    const date = month + '/' + day + '/' + year;

    return (
        <div className="sm:grid-cols-[150px,250px] md:grid-cols-[150px,300px,350px] grid grid-cols-[220px,350px,400px] font-heading text-xl w-[95%] p-[20px] bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.25)] rounded-[15px] mt-4">
            <p className="">{date}</p>
            <p className="">{app}</p>
            <p className="sm:hidden">{doc}</p>
        </div>
    );
}