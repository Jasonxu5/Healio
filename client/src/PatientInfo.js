import React from 'react';

export default function PatientInfo(props) {
    const { currUser, userHealthInfo, infoHeader } = props;
    const infoType = infoHeader.props.title;
    return (
        <div className="flex flex-col pl-[235px]">
            {infoHeader}
            <FilterOptions />
            <InfoBody currUser={currUser} userHealthInfo={userHealthInfo} infoType={infoType} />
        </div>
    )
}

function FilterOptions() {
    return (
        <div>
            <form className="flex gap-3 mt-5 mb-10">
                <label className="absolute left-[-100vw]">Type something here...</label>
                <input className="p-[12px] w-[250px] rounded-[15px] bg-grey placeholder:text-black"
                    placeholder="Search here..." aria-label="Filter your health information" autoComplete="off" />
                <select className="p-[12px] w-[200px] rounded-[15px] bg-grey">
                    <option value="volvo">Filter by status...</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </form>
        </div>
    )
}

function InfoBody(props) {
    const { currUser, userHealthInfo, infoType } = props;


    if (userHealthInfo.length === 0) {
        return <p>No {infoType.toLowerCase()} are available for {currUser.firstName}.</p>
    } else {
        const healthInfoArray = userHealthInfo.map((item, index) => {
            return <SingleHealthInfoItem
                dateObject={item.date}
                name={item.name}
                doctor={item.doctor}
                status={item.status}
                key={index} />
        });
        return (
            <div>
                <div className="flex relative mb-4 ml-5 justify-between font-heading text-2xl text-dark-blue">
                    <p className="">Date</p>
                    <p className="absolute right-[660px]">{infoType.substring(0, infoType.length - 1)}</p>
                    <p className="absolute right-[360px]">Doctor</p>
                    <p className="absolute right-[110px]">Status</p>
                </div>
                <div className="grid gap-8">
                    {healthInfoArray}
                </div>
            </div>
        )
    }
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
        <div className="flex relative justify-between font-heading text-2xl w-[95%] p-[20px] bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.25)] rounded-[20px]">
            <p className="">{date}</p>
            <p className="absolute right-[600px]">{name}</p>
            <p className="absolute right-[300px]">{doctor}</p>
            <p className="absolute right-[50px]">{status}</p>
        </div>
    );
}