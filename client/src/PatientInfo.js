import React from 'react';

const KATIE_INFO = {
    lab_results: [
        {
            date: new Date('February 10, 2022'),
            name: 'Radiology - Chest X Ray',
            doctor: 'Dr. Ortega',
            status: 'Available'
        },
        {
            date: new Date('January 4, 2022'),
            name: 'Sonography - Ultrasound',
            doctor: 'Dr. Montgomery',
            status: 'Complete'
        }
    ],
    medications: [
        {
            date: new Date('February 9, 2022'),
            name: 'Amoxicillin (Amoxil)',
            doctor: 'Dr. Ortega',
            status: 'Active'
        },
        {
            date: new Date('January 17, 2022'),
            name: 'Fluoxetine (Prozac)',
            doctor: 'Dr. Cain',
            status: 'Active'
        },
        {
            date: new Date('November 21, 2021'),
            name: 'Doxyxycline',
            doctor: 'Dr. Martinez',
            status: 'Inactive'
        }
    ]
}

const DAUGHTER_INFO = {
    lab_results: [
        {
            date: new Date('February 5, 2022'),
            name: 'Allergen Testing',
            doctor: 'Dr. Ortega',
            status: 'Active'
        }
    ],
    medications: []
}

const GRANDMA_INFO = {
    lab_results: [],
    medications: [
        {
            date: new Date('February 5, 2022'),
            name: 'Acetaminophen',
            doctor: 'Dr. Valera',
            status: 'Active'
        }
    ]
}

export default function PatientInfo(props) {
    const { currUser, infoHeader } = props;
    const infoType = infoHeader.props.title;
    return (
        <div className="flex flex-col pl-[235px]">
            {infoHeader}
            <InfoBody currUser={currUser} infoType={infoType} />
        </div>
    )
}

function FilterOptions() {

}

function InfoBody(props) {
    const { currUser, infoType } = props;
    const userFirstName = currUser.firstName;
    let userHealthInfo;
    let targetedHealthInfo;

    // This JavaScript file handles two different components
    // Therefore, several conditionals will be put into place
    if (userFirstName === 'Katie') {
        userHealthInfo = KATIE_INFO;
    } else if (userFirstName === 'Daughter') {
        userHealthInfo = DAUGHTER_INFO;
    } else {
        userHealthInfo = GRANDMA_INFO;
    }
    if (infoType === 'Lab Results') {
        targetedHealthInfo = userHealthInfo.lab_results;
    } else {
        targetedHealthInfo = userHealthInfo.medications;
    }

    if (targetedHealthInfo.length === 0) {
        return <p>No {infoType.toLowerCase()} are available for {currUser.firstName}.</p>
    } else {
        const healthInfoArray = targetedHealthInfo.map((item, index) => {
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
                    <p className="absolute left-[180px]">{infoType.substring(0, infoType.length - 1)}</p>
                    <p className="absolute left-[580px]">Doctor</p>
                    <p className="absolute left-[880px]">Status</p>
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
        <div className="flex relative justify-between font-heading text-2xl p-[20px] bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.25)] rounded-[20px]">
            <p className="">{date}</p>
            <p className="absolute left-[200px]">{name}</p>
            <p className="absolute left-[600px]">{doctor}</p>
            <p className="absolute left-[900px]">{status}</p>
        </div>
    );
}