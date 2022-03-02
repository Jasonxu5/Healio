import React from 'react';
import Header from './Header.js';
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
    const { currUser, familyInfo, setUserCallback, signedIn } = props;
    return (
        <div className="flex flex-col">
            <Header title={'Overview'} currUser={currUser} familyInfo={familyInfo} setUserCallback={setUserCallback} signedIn={signedIn}/>
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
            body = <CardHasList listItems={currUser.notifications} hasDateOnRight={false} />;
        } else if (index === 2) {
            body = <CardHasList listItems={currUser.labResults} hasDateOnRight={true} />;
        } else if (index === 3) {
            body = <CardHasImage isIntro={false} />;
        } else if (index === 4) {
            body = (
                <div>
                    <p className="pt-2 italic">{currUser.doctorNotes.date}</p>
                    <p className="pt-2">{currUser.doctorNotes.body}</p>
                    <p className="pt-2">{'- ' + currUser.doctorNotes.doctor}</p>
                </div>
            );
        } else {
            body = <CardHasList listItems={currUser.appointments} hasDateOnRight={true} />;
        }
        return <SingleHealthCard title={cardTitle} body={body} count={index} currUserFirstName={currUser.firstName} key={index} />;
    });
    return (
        <div className="grid grid-cols-2 pl-[235px] gap-4">
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
                    <Link className="absolute p-2 font-semibold bg-dark-green rounded-lg" to='/appointments'>Schedule Appointment {'>'}</Link>
                </div>
                <img className="absolute top-[-60px] right-0" src={doctor} alt="Doctor Clip Art" />
            </div>
        );
    } else {
        return (
            <div className="relative">
                <div className="mt-4 text-dark-blue">
                    <Link className="absolute p-2 font-semibold bg-dark-green rounded-lg" to='/'>Find Providers {'>'}</Link>
                </div>
                <img className="absolute top-[-72px] right-[-20px]" src={hospital} alt="Hospital Clip Art" />
            </div>
        );
    }
}

function CardHasList(props) {
    const { listItems, hasDateOnRight } = props;
    let listItemsArray;

    if (hasDateOnRight) {
        listItemsArray = listItems.map((item, index) => {
            return (
                <div key={index}>
                    <p className="pt-2 float-left">{item.title}</p>
                    <p className="pt-2 float-right">{item.date + " >"}</p>
                </div>
            );
        });
    } else {
        listItemsArray = listItems.map((item, index) => {
            return <p className="pt-2" key={index}>{item}</p>;
        });
    }

    return (
        <ul className="grid divide-y divide-[#E5E5E5] gap-2">
            {listItemsArray}
        </ul>
    );
}

function SingleHealthCard(props) {
    const { title, body, count, currUserFirstName } = props;

    let introCardOnGrid;
    let stackSmallCards;
    let heightPxSize;
    let headerStyle;

    // Place intro card at the top
    if (count === 0) {
        introCardOnGrid = 'col-span-2 ';
    } else {
        introCardOnGrid = '';
    }

    // Stack smaller cards on top of each other
    if (count === 2) {
        stackSmallCards = 'row-start-2 col-start-2 '
    } else if (count === 3) {
        stackSmallCards = 'row-start-2 col-start 2 col-end-[-1] self-end ';
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
        <div className={"p-6 " + introCardOnGrid + stackSmallCards + " w-full " + heightPxSize + "bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.25)] rounded-[20px]"}>
            {headerStyle}
            {body}
        </div>
    );
}