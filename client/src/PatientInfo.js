import React, { useState } from 'react';

export default function PatientInfo(props) {
    const { currUser, userHealthInfo, infoHeader } = props;
    const [currStatus, setCurrStatus] = useState('');
    const [currInfo, setCurrInfo] = useState('');
    const infoType = infoHeader.props.title;


    const statusSet = new Set();
    const statusArray = userHealthInfo.map((item, index) => {
        if (!statusSet.has(item.status)) {
            statusSet.add(item.status);
            return <option value={item.status} key={index}>{item.status}</option>;
        }
    });
    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            {infoHeader}
            <FilterOptions statuses={statusArray} currStatus={currStatus} currStatusCallback={setCurrStatus} currInfoCallback={setCurrInfo} infoType={infoType} />
            <InfoBody currUser={currUser} currStatus={currStatus} currInfo={currInfo} userHealthInfo={userHealthInfo} infoType={infoType} />
        </div>
    )
}

function FilterOptions(props) {
    const { statuses, currStatus, currStatusCallback, currInfoCallback, infoType } = props;
    const handleOptionChange = (event) => {
        currStatusCallback(event.target.value);
    };

    const handleTextChange = (event) => {
        currInfoCallback(event.target.value.toLowerCase());
    };
    return (
        <div>
            <form className="animate-popup flex gap-3 mt-5 mb-10">
                <label className="absolute left-[-100vw]">Type something here...</label>
                <input className="p-[12px] w-[250px] rounded-[15px] bg-grey placeholder:text-black"
                    onChange={handleTextChange} placeholder={'Search for ' + infoType + '...'} aria-label="Filter your health information" autoComplete="off" />
                <select className="p-[12px] w-[200px] rounded-[15px] bg-grey" onChange={handleOptionChange} value={currStatus}>
                    <option value="">Filter by status...</option>
                    {statuses}
                </select>
            </form>
        </div>
    )
}

function InfoBody(props) {
    const { currUser, currStatus, currInfo, userHealthInfo, infoType } = props;

    const healthInfoArray = userHealthInfo.map((item, index) => {
        const itemLowercase = item.name.toLowerCase();
        if ((currStatus === '' || currStatus === item.status) && itemLowercase.includes(currInfo)) {
            return <SingleHealthInfoItem
                dateObject={item.date}
                name={item.name}
                doctor={item.doctor}
                status={item.status}
                key={index} />
        }
    });
    return (
        <div>
            <div className="sm:grid-cols-[150px,250px] md:grid-cols-[150px,300px,350px] grid grid-cols-[150px,300px,175px,50px] font-heading text-xl mt-2 ml-5">
                <p className="">Date</p>
                <p className="">{infoType !== 'Surgeries' && infoType !== 'Allergies' ? infoType.substring(0, infoType.length - 1) : infoType.substring(0, infoType.length - 3) + 'y'}</p>
                <p className="sm:hidden">Doctor</p>
                <p className="md:hidden">Status</p>
            </div>
            <div className="animate-popup grid gap-8">
                {!(healthInfoArray.every((item) => item === undefined)) ? healthInfoArray : <p>No {infoType.toLowerCase()} are available for {currUser.firstName}.</p>}
            </div>
        </div>
    )
}

function SingleHealthInfoItem(props) {
    const { dateObject, name, doctor, status } = props;

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
        <div className="sm:grid-cols-[150px,250px] md:grid-cols-[150px,300px,250px] grid grid-cols-[150px,300px,175px,50px] relative font-heading text-xl w-[95%] p-[20px] bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.25)] rounded-[20px]">
            <p className="">{date}</p>
            <p className="">{name}</p>
            <p className="sm:hidden">{doctor}</p>
            <p className="md:hidden">{status}</p>
        </div>
    );
}