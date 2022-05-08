import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function AddUserModal(props) {
    const { userInfo, familyInfo, familyInfoCallback, isAddUserClicked, addUserCallback, addUserRef } = props;
    const [typedName, setTypedName] = useState('');
    const [currUsersAdded, setCurrUsersAdded] = useState([]);
    
    const familyInfoArray = familyInfo.map(person => {

        // Replace with index of person.
        return person.firstName + ' ' + person.lastName;
    });
    const userInfoArray = userInfo.map((person, index) => {
        const personFullName = person.firstName + ' ' + person.lastName;
        const lowerCaseFullName = personFullName.toLowerCase();

        // Change the check to see if the family array includes the person's index.
        // This will cause a bug if the user changes their name, so we need to compare for index instead.
        if (!familyInfoArray.includes(personFullName) && lowerCaseFullName.includes(typedName)) {
            return <IndividualUser user={person} currUsersAdded={currUsersAdded} currUsersAddedCallback={setCurrUsersAdded} key={index} />;
        }
    });
    const handleTextChange = (event) => {
        setTypedName(event.target.value.toLowerCase());
    };
 
    const handleFamilyUpdate = () => {
        addUserCallback(false);
        familyInfoCallback([...familyInfo, ...currUsersAdded]);
        setCurrUsersAdded([]);
    };

    // modal is a piece of garbage that blocks scrolling
    if (useLocation().pathname !== '/messages' && isAddUserClicked) {
        document.body.style.overflow = '';
    }
    
    return (
        <Modal className="sm:w-[250px] md:w-[500px] animate-popup absolute left-[25%] top-[10%] w-[750px] p-5 bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" show={isAddUserClicked} ref={addUserRef}>
            <FontAwesomeIcon className="text-2xl mb-2 hover:text-[#FF0000] hover:cursor-pointer" onClick={() => addUserCallback(false)} icon={faX} size="lg" aria-label="Close icon" />
            <Modal.Header className="text-center" closeButton>
                <Modal.Title className="font-heading text-3xl">Add a family member</Modal.Title>
            </Modal.Header>
            <form className="flex gap-3 justify-center mb-6">
                <label className="absolute left-[-100vw]">Search for family member...</label>
                <input className="p-[12px] w-[75%] rounded-[15px] bg-grey" onChange={handleTextChange} value={typedName} placeholder="Search for family member..." autoComplete="off" />
            </form>
            <div className="sm:grid-cols-1 md:grid-cols-2 grid grid-cols-3 h-[] overflow-y-auto">
                {!(userInfoArray.every((person) => person === undefined)) ? userInfoArray : <p>No users found.</p>}
            </div>
            <p className="transition py-3 px-6 mx-auto w-[150px] mt-2 border-2 border-light-blue rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold" onClick={handleFamilyUpdate}>Add to Family</p>
        </Modal>
    )
}

function IndividualUser(props) {
    const { user, currUsersAdded, currUsersAddedCallback } = props;
    const [isAdded, setIsAdded] = useState(false);
    const fullName = user.firstName + ' ' + user.lastName;

    const handleClick = () => {
        setIsAdded(!isAdded);
        if (!isAdded) {
            currUsersAddedCallback([...currUsersAdded, user]);
        } else {
            const removeUser = currUsersAdded.filter(userInArray => { 
                return user !== userInArray;
            });
            currUsersAddedCallback([...removeUser]);
        }
    };
    return (
        <div className={'ml-5 transition rounded-full hover:cursor-pointer hover:bg-light-blue' + (isAdded ? ' bg-light-blue' : '')} onClick={handleClick}>
            <img className="rounded-full inline w-10 h-10" src={user.img} alt={fullName} />
            <p className="inline pl-3">{fullName}</p>
        </div>
    );
}