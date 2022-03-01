import React, { useState } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function Header(props) {
    const { title, userInfo, familyInfo } = props;
    const [showMenu, setMenu] = useState(false);
    const fullName = userInfo.firstName + ' ' + userInfo.lastName;
    const familyInfoArray = familyInfo.map(person => {
        let personInfo;
        if (!_.isEqual(userInfo, person)) {
            personInfo = <IndividualFamilyMember familyMember={person} key={person.firstName + ' ' + person.lastName} />;
            return personInfo;
        }
    });
    const isClicked = () => {
        console.log('clicked');
        setMenu(true);
    }
    let signInPopup = '';

    if (userInfo.isAdmin) {
        familyInfoArray.push(AddAnotherUser());
    }
    if (showMenu) {
        signInPopup = MenuPopup(fullName, userInfo.img, familyInfoArray);
    }

    return (
        <header className="relative py-8 pl-[235px]">
            <p className="font-heading text-3xl">{title}</p>
            <div className="absolute bottom-[20px] right-0" onClick={isClicked}>
                <img className="rounded-full inline w-10 h-10 mb-2" src={userInfo.img} alt={fullName} />
                <p className="inline text-2xl ml-2">{fullName}</p>
                {signInPopup}
            </div>
        </header>
    );
}

function IndividualFamilyMember(props) {
    const { familyMember } = props;
    const fullName = familyMember.firstName + ' ' + familyMember.lastName;
    return (
        <div className="p-1">
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

function MenuPopup(fullName, img, familyInfoArray) {
    return (
        <div className="absolute grid gap-2 right-0 w-[424px] p-6 border-2 border-black bg-[#FFFFFF] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] z-[100] rounded-[15px]">
            <div>
                <img className="rounded-full w-20 h-20 m-auto" src={img} alt={fullName} />
                <p className="text-2xl text-center">{fullName}</p>
            </div>
            <hr className="border-grey" />
            <div className="py-2">
                {familyInfoArray}
            </div>
            <hr className="border-grey" />
            <div className="mx-auto py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px]">
                <p>Log Out</p>
            </div>
        </div>
    );
}
/*
IN APP

add currUser and familyListArray as state variables

import katie from './img/katie.png'; // profile picture

const FAMILY_INFO = [
  {
    firstName: 'Katie',
    lastName: 'Wang',
    img: katie,
    isAdmin: true
  },
  {
    firstName: 'Daughter',
    lastName: 'Wang',
    img: katie,
    isAdmin: false
  },
  {
    firstName: 'Grandma',
    lastName: 'Wang',
    img: katie,
    isAdmin: false
  }
];

          <Route exact path="/" element={<Health userInfo={FAMILY_INFO[0]} familyInfo={FAMILY_INFO} />} />

IN HEALTH

import Header from './Header.js';


export default function Health(props) {
    const { userInfo, familyInfo } = props;
    return (
        <div className="flex flex-col">
            <Header title={'Overview'} userInfo={userInfo} familyInfo={familyInfo} />
            <HealthCards user={userInfo.firstName} />
        </div>
    );
}

*/