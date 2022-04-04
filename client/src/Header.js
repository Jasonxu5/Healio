import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function Header(props) {
    const { title, currUser, familyInfo, setUserCallback } = props;
    const [isMenuOpen, setMenu] = useState(false);
    const ref = useRef();
    const fullName = currUser.firstName + ' ' + currUser.lastName;
    
    const familyInfoArray = familyInfo.map(person => {
        if (!_.isEqual(currUser, person)) {
            return <IndividualFamilyMember familyMember={person} setUserCallback={setUserCallback} key={person.firstName + ' ' + person.lastName} />;
        }
    });
    
    // Set up clicking event for dropdown user accounts
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setMenu(false);
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        }
    }, [isMenuOpen]);

    if (currUser.isAdmin) {
        familyInfoArray.push(AddAnotherUser());
    }

    // Need to flex container for Font Awesome Icon
    return (
        <header className="relative py-8">
            <p className="font-heading text-3xl">{title}</p>
            <div className="absolute flex bottom-[20px] right-[30px] hover:cursor-pointer bg-light-green rounded-full mb-2 pr-3" onClick={() => setMenu(true)}>
                <img className="rounded-full inline w-12 h-12" src={currUser.img} alt={fullName} />
                <FontAwesomeIcon className="self-center text-2xl ml-3" icon={faAngleDown} size="lg" aria-label="Down arrow for choosing a user in the family" />
                {isMenuOpen ? MenuPopup(ref, fullName, currUser.img, familyInfoArray) : null}
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
        <div className="p-1" onClick={handleClick}>
            <img className="rounded-full inline w-10 h-10 mb-2" src={familyMember.img} alt={fullName} />
            <p className="inline pl-3">{fullName}</p>
        </div>
    );
}

function AddAnotherUser() {
    return (
        <div className="p-1" key="add">
            <FontAwesomeIcon className="ml-3" icon={faUserPlus} size="lg" aria-label="Authorize another user" />
            <p className="inline ml-4">Authorize another user</p>
        </div>
    );
}

function MenuPopup(ref, fullName, img, familyInfoArray) {
    const handleSignOut = () => {
        firebase.auth().signOut();
    }

    return (
        <div className="absolute grid gap-2 right-0 top-[50px] w-[424px] p-6 border-2 border-black bg-[#FFFFFF] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] z-[100] rounded-[15px] cursor-auto" ref={ref}>
            <div>
                <img className="rounded-full w-20 h-20 m-auto" src={img} alt={fullName} />
                <p className="text-2xl text-center">{fullName}</p>
            </div>
            <hr className="border-grey" />
            <div className="py-2 hover:cursor-pointer">
                {familyInfoArray}
            </div>
            <hr className="border-grey" />
            <Link to="/" className="mx-auto py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold" onClick={handleSignOut}>
                <p>Log Out</p>
            </Link>
        </div>
    );
}