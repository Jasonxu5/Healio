import React, { useState, useEffect, useRef } from 'react';
import AddUserModal from './AddUserModal';
import { serverEndpoint } from './serverEndpoint.js';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import katie from './img/katie.png'; // profile picture
import daughter from './img/daughter.png';
import grandma from './img/grandma.png';

const apiEndpoint = serverEndpoint;

const USER_INFO = [
    {
        index: 1,
        firstName: 'Daughter',
        lastName: 'Wang',
        img: daughter,
        notifications: [
            'You have a new message from Dr. Osborn!',
            'New prescription added to your medications.',
            'Receipt of your payment for appointment on 02/06/22',
            'You have a new message from Dr. Ortega!'
        ],
        labResults: [
            {
                date: new Date('February 5, 2022'),
                name: 'Allergen Testing',
                doctor: 'Dr. Ortega',
                status: 'Active'
            }
        ],
        medications: [],
        doctorNotes: {
            date: '02/06/2022',
            body: 'Daughter Wang came home from school yesterday with a very sore throat and recorded a fever that night. She reported no other symptoms and has been taking ibuprofen for the fever. ' +
                'Probable infection, recommended stay home from school, the likely the place of contraction.',
            doctor: 'Dr. Ortega'
        },
        appointments: [
            { name: 'Yearly check-up with Dr. Osborn', date: new Date('February 15, 2022') }
        ],
        isAdmin: false
    },
    {
        index: 2,
        firstName: 'Grandma',
        lastName: 'Wang',
        img: grandma,
        notifications: [
            'You have a new message from Dr. Osborn!',
            'New prescription added to your medications.',
            'Your recent lab results have arrived!',
            'Receipt of your payment for appointment on 02/08/22',
            'You have a new message from Dr. Ortega!',
            'New prescription added to your medications.'
        ],
        labResults: [],
        medications: [
            {
                date: new Date('February 5, 2022'),
                name: 'Acetaminophen',
                doctor: 'Dr. Valera',
                status: 'Active'
            }
        ],
        doctorNotes: {
            date: '02/08/2021',
            body: 'Grandma Wang was accompanied by her daughter Katie who reported that Mrs. Wang has been experiencing pain, stiffness, and decreased range of motion in her joints. She has been taking tylenol for the pain and vitamins for her health. ' +
                'Possible arthritis, follow up x-rays will be taken to determine the cause.',
            doctor: 'Dr. Valera'
        },
        appointments: [
            { name: 'Yearly check-up with Dr. Osborn', date: new Date('February 15, 2022') },
            { name: 'Follow up with Dr. Valera', date: new Date('February 21, 2022') }
        ],
        isAdmin: false
    },
    {
        index: 3,
        firstName: 'Imposter',
        lastName: 'Grandma',
        img: grandma,
        notifications: [
        ],
        labResults: [],
        medications: [
        ],
        doctorNotes: {
        },
        appointments: [
        ],
        isAdmin: false
    },
    {
        index: 4,
        firstName: 'Sus',
        lastName: 'Grandma',
        img: grandma,
        notifications: [],
        labResults: [],
        medications: [],
        doctorNotes: {},
        appointments: [],
        isAdmin: false
    },
    {
        index: 5,
        firstName: 'Killer',
        lastName: 'Grandma',
        img: grandma,
        notifications: [
        ],
        labResults: [],
        medications: [],
        doctorNotes: {},
        appointments: [],
        isAdmin: false
    },
    {
        index: 6,
        firstName: 'Imposter',
        lastName: 'Grandma',
        img: grandma,
        notifications: [
        ],
        labResults: [],
        medications: [
        ],
        doctorNotes: {
        },
        appointments: [
        ],
        isAdmin: false
    },
    {
        index: 7,
        firstName: 'Sus',
        lastName: 'Grandma',
        img: grandma,
        notifications: [],
        labResults: [],
        medications: [],
        doctorNotes: {},
        appointments: [],
        isAdmin: false
    },
    {
        index: 8,
        firstName: 'Killer',
        lastName: 'Grandma',
        img: grandma,
        notifications: [
        ],
        labResults: [],
        medications: [],
        doctorNotes: {},
        appointments: [],
        isAdmin: false
    }
];

export default function Header(props) {
    const { title, currUser, setUserCallback, familyInfo, familyInfoCallback, loginStatus } = props;
    const [isMenuOpen, setMenu] = useState(false);
    const [isAddUserClicked, setIsAddUserClicked] = useState(false);
    const menuRef = useRef();
    const addUserRef = useRef();
    const fullName = currUser.firstName + ' ' + currUser.lastName;

    const familyInfoArray = familyInfo.map((person, index) => {
        if (!_.isEqual(currUser, person)) {
            return <IndividualFamilyMember familyMember={person} setUserCallback={setUserCallback} key={index} />;
        }
    });

    // Set up clicking event for dropdown user accounts and modals
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenu(false);
            }
            // I included the typeof so it won't throw an error
            if (isAddUserClicked && (typeof (e.target.className) !== 'object') && !addUserRef.current.dialog.contains(e.target)) {
                setIsAddUserClicked(false);
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        }
    }, [isMenuOpen, isAddUserClicked]);

    if (currUser.isAdmin) {
        const verySpecialKey = familyInfoArray.length  + 1;
        familyInfoArray.push(<AddAnotherUser addUserCallback={setIsAddUserClicked} key={verySpecialKey} />);
    }


    // Need to flex container for Font Awesome Icon
    return (
        <header className="relative py-8">
            <AddUserModal userInfo={USER_INFO} familyInfo={familyInfo} familyInfoCallback={familyInfoCallback} isAddUserClicked={isAddUserClicked} addUserCallback={setIsAddUserClicked} addUserRef={addUserRef} />
            <p className="md:text-center font-heading text-3xl">{title}</p>
            <div className="absolute flex bottom-[20px] right-[30px] hover:cursor-pointer bg-light-green rounded-full mb-2 pr-3" onClick={() => setMenu(true)}>
                <img className="rounded-full inline w-12 h-12" src={currUser.img} alt={fullName} />
                <FontAwesomeIcon className="self-center text-2xl ml-3" icon={faAngleDown} size="lg" aria-label="Down arrow for choosing a user in the family" />
                {isMenuOpen ? <MenuPopup menuRef={menuRef} fullName={fullName} img={currUser.img} familyInfoArray={familyInfoArray} loginStatus={loginStatus} /> : null}
            </div>
        </header>
    );
}

function IndividualFamilyMember(props) {
    const { familyMember, setUserCallback } = props;
    const fullName = familyMember.firstName + ' ' + familyMember.lastName;
    const handleClick = () => {
        setUserCallback(familyMember);
    }

    return (
        <div className="transition rounded-full mb-2 w-full hover:bg-light-blue" onClick={handleClick}>
            <img className="rounded-full inline w-10 h-10" src={familyMember.img} alt={fullName} />
            <p className="inline pl-3">{fullName}</p>
        </div>
    );
}

function AddAnotherUser(props) {
    const { addUserCallback } = props;
    const handleShow = () => addUserCallback(true);

    return (
        <div className="p-1" key="add" onClick={handleShow}>
            <FontAwesomeIcon className="ml-3" icon={faUserPlus} size="lg" aria-label="Authorize another user" />
            <p className="inline ml-4">Authorize another user</p>
        </div>
    );
}

function MenuPopup(props) {
    const { menuRef, fullName, img, familyInfoArray, loginStatus } = props;
    const handleSignOut = async () => {
        // firebase.auth().signOut();
        await fetch(apiEndpoint + "logout", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            mode: 'cors'
        });
        console.log('logging out')
        loginStatus();
    }

    return (
        <div className="animate-popup absolute grid gap-2 right-0 top-[50px] w-[424px] p-6 border-2 border-black bg-[#FFFFFF] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] z-[100] rounded-[15px] cursor-auto" ref={menuRef}>
            <div>
                <img className="rounded-full w-20 h-20 m-auto" src={img} alt={fullName} />
                <p className="text-2xl text-center">{fullName}</p>
            </div>
            <hr className="border-grey" />
            <div className="py-2 hover:cursor-pointer">
                {familyInfoArray}
            </div>
            <hr className="border-grey" />
            <div className="transition mx-auto py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold" onClick={handleSignOut}>
                <p>Log Out</p>
            </div>
        </div>
    );
}