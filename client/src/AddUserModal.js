import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function AddUserModal(props) {
    const { userInfo, familyInfo, isAddUserClicked, addUserCallback } = props;
    const [typedName, setTypedName] = useState('');

    const familyInfoArray = familyInfo.map(person => {
        return person.firstName + ' ' + person.lastName;
    });
    const userInfoArray = userInfo.map((person, index) => {
        const personFullName = person.firstName + ' ' + person.lastName;
        const lowerCaseFullName = personFullName.toLowerCase();
        if (!familyInfoArray.includes(personFullName) && lowerCaseFullName.includes(typedName)) {
            return <IndividualUser user={person} key={index} />;
        }
    });

    const handleTextChange = (event) => {
        setTypedName(event.target.value.toLowerCase());
    };

    return (
        <Modal className="absolute left-[25%] top-[40%] w-[750px] p-5 bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" show={isAddUserClicked}>
            <FontAwesomeIcon className="text-2xl mb-2 hover:text-[#FF0000] hover:cursor-pointer" onClick={() => addUserCallback(false)} icon={faX} size="lg" aria-label="Close icon" />
            <Modal.Header className="text-center" closeButton>
                <Modal.Title className="font-header text-3xl">Add a family member</Modal.Title>
            </Modal.Header>
            <form className="flex gap-3 justify-center mb-6">
                <label className="absolute left-[-100vw]">Search for family member...</label>
                <input className="p-[12px] w-[75%] rounded-[15px] bg-grey" onChange={handleTextChange} value={typedName} placeholder="Search for family member..." autoComplete="off" />
            </form>
            <div className="grid grid-cols-3">
                {userInfoArray}
            </div>
            <p className="py-3 px-6 mx-auto w-[150px] mt-2 border-2 border-light-blue rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold">Add to Family</p>
        </Modal>
    )
}

function IndividualUser(props) {
    const { user } = props;
    const fullName = user.firstName + ' ' + user.lastName;

    return (
        <div className="p-1">
            <img className="rounded-full inline w-10 h-10 mb-2" src={user.img} alt={fullName} />
            <p className="inline pl-3">{fullName}</p>
        </div>
    );
}