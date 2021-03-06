// how do you add overflow to each card?

import React from 'react';
import { Link } from 'react-router-dom';
import doctor from './img/doctor.svg';
import hospital from './img/hospital.svg';

const HEALTH_CARD_TITLES = [
    'Hello, ',
    'Notifications',
    'Lab Results',
    'Looking for a New Provider?',
    'Doctor\'s Notes',
    'Upcoming Appointments'
];

export default function Health(props) {
    const { currUser, healthHeader } = props;
    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            {healthHeader}
            <HealthCards currUser={currUser} />
        </div>
    );
}

function HealthCards(props) {
    const { currUser } = props;

    const healthInfoCards = HEALTH_CARD_TITLES.map((cardTitle, index) => {
        let body;
        if (index === 0) {
            body = <CardHasImage isIntro={true} />;
        } else if (index === 1) {
            body = <CardHasList listItems={currUser.notifications} hasDateOnRight={false} link={''} />; // we hab to change this link
        } else if (index === 2) {
            body = <CardHasList listItems={currUser.labResults} hasDateOnRight={true} link={'/health/lab_results'} />;
        } else if (index === 3) {
            body = <CardHasImage isIntro={false} />;
        } else if (index === 4) {
            const doctorNotesLength = Object.keys(currUser.doctorNotes).length;
            if (doctorNotesLength === 0) {
                body = <div className="mt-2">No items found.</div>;
            } else {
                body = (
                    <div>
                        <p className="pt-2 italic">{currUser.doctorNotes.date}</p>
                        <p className="pt-2">{currUser.doctorNotes.body}</p>
                        <p className="pt-2">{'- ' + currUser.doctorNotes.doctor}</p>
                    </div>
                );
            }
        } else {
            body = <CardHasList listItems={currUser.appointments} hasDateOnRight={true} link={'/appointments'}/>;
        }
        return <SingleHealthCard title={cardTitle} body={body} count={index} currUserFirstName={currUser.firstName} key={index} />;
    });
    return (
        <div className="sm:flex sm:flex-col grid grid-cols-2 gap-4">
            {healthInfoCards}
        </div>
    );
}

function CardHasImage(props) {
    const { isIntro } = props;

    if (isIntro) {
        return (
            <div className="relative">
                <p className="pt-2">You have new notifications! Have a nice day and remember to take care of your health!</p>
                <div className="mt-6 text-dark-blue">
                    <Link className="absolute p-2 font-semibold bg-dark-green rounded-lg" to='/appointments/schedule_appointment'>Schedule Appointment {'>'}</Link>
                </div>
                <img className="md:hidden absolute top-[-79px] h-[14rem] right-0" src={doctor} alt="Doctor Clip Art" />
            </div>
        );
    } else {
        return (
            <div className="relative">
                <div className="mt-4 text-dark-blue">
                    <Link className="absolute p-2 font-semibold bg-dark-green rounded-lg" to='/resources'>Find Providers {'>'}</Link>
                </div>
                <img className="md:hidden absolute top-[-20px] right-[-25px] h-[10vw]" src={hospital} alt="Hospital Clip Art" />
            </div>
        );
    }
}

function CardHasList(props) {
    const { listItems, hasDateOnRight, link } = props;
    let listItemsArray;

    if (hasDateOnRight) {
        listItemsArray = listItems.map((item, index) => {
            const dateObject = item.date;
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
                <div key={index}>
                    <p className="pt-2 float-left">{item.name}</p>
                    <p className="pt-2 float-right">{date + " >"}</p>
                </div>
            );
        });
    } else {
        listItemsArray = listItems.map((item, index) => {
            return <p className="pt-2" key={index}>{item}</p>;
        });
    }

    if (listItemsArray.length === 0) {
        return (
            <div className="mt-2">No items found.</div>
        )
    } else {
        return (
            <Link to={link} className="grid divide-y divide-grey gap-2">
                {listItemsArray}
            </Link>
        );
    }
}

function SingleHealthCard(props) {
    const { title, body, count, currUserFirstName } = props;

    let introCardOnGrid;
    let stackSmallCards;
    let heightPxSize;
    let widthPxSize;
    let headerStyle;

    // Place intro card at the top
    if (count === 0) {
        introCardOnGrid = 'col-span-2 ';
    } else {
        introCardOnGrid = 'overflow-y-auto ';
    }

    // Stack smaller cards on top of each other
    if (count === 2) {
        stackSmallCards = 'row-start-2 col-start-2 '
    } else if (count === 3) {
        stackSmallCards = 'sm:self-start row-start-2 col-start 2 col-end-[-1] self-end ';
    } else {
        stackSmallCards = '';
    }

    // Create card height depending on where it is on the grid
    if (count === 0) {
        heightPxSize = 'h-[205px] ';
    } else if (count === 1) {
        heightPxSize = 'h-[321px] ';
    } else if (count < 4) {
        heightPxSize = 'h-[144.5px] ';
    } else {
        heightPxSize = 'h-[280px] ';
    }

    // Create card width depending on where it is on the grid
    if (count === 0) {
        widthPxSize = 'sm:w-[95%] w-[97.5%] ';
    } else {
        widthPxSize = 'w-[95%] ';
    }

    // Creates different font styles for the introductory card
    if (count === 0) {
        headerStyle = (
            <div className="font-heading text-3xl font-semibold">
                <h2 className='text-dark-blue inline'>{title}</h2>
                <h2 className='text-light-blue inline'>{currUserFirstName + '!'}</h2>
            </div>
        );
    } else {
        headerStyle = <h2 className='font-heading text-2xl'>{title}</h2>
    }

    return (
        <div className={"animate-popup p-6 " + introCardOnGrid + stackSmallCards + widthPxSize + heightPxSize + "bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.25)] rounded-[20px]"}>
            {headerStyle}
            {body}
        </div>
    );
}