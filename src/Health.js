// Conditions
// isIntro
// isList -> hasDate
// hasLink

import React from 'react';
import { Link } from 'react-router-dom';
import katie from './img/katie.png'; // profile picture
import doctor from './img/doctor.svg';

const HEALTH_CARD_TITLES = [
    "Hello, ",
    "Notifications",
    "Lab Results",
    "Looking for a New Provider?",
    "Doctor's Notes",
    "Upcoming Appointments"
];

export default function Health() {
    // Profile picture under img: "rounded-full w-8 h-8"
    // Username under p: "text-2xl ml-2"
    // "absolute left-[235px]"
    return (
        <div className="flex flex-col">
            <header className="relative py-8 pl-[235px]">
                <p className="font-heading text-3xl">Overview</p>
                <div className="absolute bottom-[20px] right-0">
                    <img className="rounded-full inline w-10 h-10 mb-2" src={katie} alt="Katie Wang" />
                    <p className="inline text-2xl ml-2">Katie Wang</p>
                </div>
            </header>
            <HealthCards user={'Katie'} />
        </div>
    );
}

function HealthCards(props) {
    const { user } = props;

    const healthInfoCards = HEALTH_CARD_TITLES.map((cardTitle, index) => {
        let body;
        if (index === 0) {
            body = <CardHasImage isIntro={true} />;
        } else if (index === 3) {
            body = <CardHasImage isIntro={false} />;
        } else if (index === 4) {
            // this is logic built within a random if statement
            // bc i'm too lazy to make a function for it shrug
            body = <p className="pt-2">Mrs. Wang you are fine! I hope ...</p>;
        } else if (index === 1) {
            body = <CardHasList hasDateOnRight={false} />;
        } else {
            body = <CardHasList hasDateOnRight={true} />;
        }
        return <SingleHealthCard title={cardTitle} body={body} count={index} user={user} key={cardTitle} />;
    }); // additional rule to try: auto-rows-[minmax(min-content, max-content)]
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
                <p className="pt-2">You have new notifications! Have a nice day and remember</p>
                <p>to take care of your health!</p>
                <div className="mt-6 text-dark-blue">
                    <Link className="absolute p-2 font-semibold bg-dark-green rounded-lg" to='/appointments'>Schedule Appointment {'>'}</Link>
                </div>
                <img className="absolute top-[-60px] right-0" src={doctor} alt="Doctor Clip Art" />
            </div>
        );
    } else {
        return <p className="pt-2">This is the right place to find a new provider!</p>
    }
}

function CardHasList(props) {
    const { hasDateOnRight } = props;

    if (hasDateOnRight) {
        return <p className="pt-2">This card has some text on the left and a date on the right as a list!</p>
    } else {
        return <p className="pt-2">This card has some text as a list with no dates!</p>
    }
}

// Customize properties of each card
function SingleHealthCard(props) {
    const { title, body, count, user } = props;

    let introCardOnGrid;
    let stackSmallCards;
    let heightPxSize;
    let headerStyle;

    // Place intro card on the top
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

    // Determine card height based on position
    if (count === 0) {
        heightPxSize = 'h-[205px] ';
    } else if (count === 1) {
        heightPxSize = 'h-[321px] ';
    } else if (count < 4) {
        heightPxSize = 'h-[144.5px] ';
    } else {
        heightPxSize = 'h-[280px] ';
    }


    // Header styling based on the introductory card
    if (count === 0) {
        headerStyle = (
            <div className="font-heading text-3xl font-semibold">
                <h2 className='text-dark-blue inline'>{title}</h2>
                <h2 className='text-light-blue inline'>{user + '!'}</h2>
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