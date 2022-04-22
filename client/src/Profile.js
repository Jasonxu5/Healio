import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

export default function Profile(props) {
    const { currUser, familyInfo, familyInfoCallback, profileHeader } = props;
    const [isUserEditing, setIsUserEditing] = useState(false);
    let profileLayout = <ProfileInformation currUser={currUser} familyInfo={familyInfo} />;
    if (isUserEditing) {
        profileLayout = <EditProfile currUser={currUser} familyInfo={familyInfo} familyInfoCallback={familyInfoCallback} userEditCallback={setIsUserEditing} />;;
    }
    return (
        <div>
            <div className="flex flex-col pl-[235px]">
                {profileHeader}
                {profileLayout}
            </div>
            <div className="absolute top-[100px] right-[30px] py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold"
                onClick={() => { setIsUserEditing(!isUserEditing) }}>
                <p className="inline">{isUserEditing ? "Cancel Edit" : "Edit Profile"}</p>
                <FontAwesomeIcon className="inline ml-2" icon={faPenToSquare} aria-label="Edit a profile" />
            </div>
        </div>
    );
}

function ProfileInformation(props) {
    const { currUser, familyInfo } = props;

    const familyInfoArray = familyInfo.map((person, index) => {
        if (!_.isEqual(currUser, person)) {
            return <IndividualFamilyMember familyMember={person} isEditing={false} key={index} />;
        }
    });

    return (
        <div className="flex gap-6">
            <img src={currUser.img} className="rounded-full w-36 h-36 border-2" />
            <div className="flex flex-col gap-6 font-heading text-2xl">
                <h1>{currUser.firstName + ' ' + currUser.lastName}</h1>
                <div>
                    <h1 className="mb-4">Family Information</h1>
                    <div className="font-sans text-lg">
                        {familyInfoArray}
                    </div>
                </div>
            </div>
        </div>
    );
}

function EditProfile(props) {
    const { currUser, familyInfo, familyInfoCallback, userEditCallback } = props;
    const [newFirstName, setNewFirstName] = useState(currUser.firstName);
    const [newLastName, setNewLastName] = useState(currUser.lastName);
    const [newFamilyInfo, setNewFamilyInfo] = useState([...familyInfo]);

    const familyInfoArray = familyInfo.map((person, index) => {
        if (!_.isEqual(currUser, person)) {
            return <IndividualFamilyMember currUser={currUser} familyMember={person} newFamilyInfo={newFamilyInfo} newFamilyInfoCallback={setNewFamilyInfo} isEditing={true} key={index} />;
        }
    });

    const handleFirstNameChange = (event) => {
        setNewFirstName(event.target.value);
    }
    const handleLastNameChange = (event) => {
        setNewLastName(event.target.value);
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        let isThereNoError = true;

        if (newFirstName.length === 0) { // add space constraint
            console.log('First name must have at least one non-space character.');
            isThereNoError = false;
        } else {
            console.log('First name is changed. The first name is now: ' + newFirstName);
        }

        if (newLastName.length === 0) { // add space constraint
            console.log('Last name must have at least one non-space character.');
            isThereNoError = false;
        } else {
            console.log('Last name is changed. The last name is now: ' + newLastName);
        }

        if (isThereNoError) {
            currUser.firstName = newFirstName;
            currUser.lastName = newLastName;
            userEditCallback(false);
            const newFamilyArray = newFamilyInfo.map(person => { return person.firstName + ' ' + person.lastName + ' ' });
            console.log('New family info is now ' + newFamilyArray);
            familyInfoCallback([...newFamilyInfo]);
        }
    }

    return (
        <div className="flex gap-6">
            <div>
                <img src={currUser.img} className="rounded-full w-36 h-36 border-2" />
                <form className="relative">
                    <label className="absolute left-[100vw]" htmlFor="img">Choose image file</label>
                    <input className="absolute file:visible file:py-3 file:px-6 file:border-light-blue bg-[#FFFFFF] file:rounded-[15px] file:hover:cursor-pointer file:hover:bg-light-blue hover:font-bold invisible left-[5px] top-[5px]" type="file" name="img" accept="image/*" />
                </form>
            </div>
            <div className="flex flex-col gap-6 font-heading text-2xl">
                <div className="flex gap-6">
                    <input className="p-[12px] rounded-[15px] bg-grey" placeholder="New first name..." aria-label="Change first name" autoComplete="off" onChange={handleFirstNameChange} />
                    <input className="p-[12px] rounded-[15px] bg-grey" placeholder="New last name..." aria-label="Change last name" autoComplete="off" onChange={handleLastNameChange} />
                </div>
                <div>
                    <h1 className="mb-4">Family Information</h1>
                    <div className="font-sans text-lg">
                        {familyInfoArray}
                    </div>
                </div>
            </div>
            <div className="absolute top-[175px] right-[30px] py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold"
                onClick={handleFormSubmit}>
                <p className="inline">{"Submit Edit"}</p>
                <FontAwesomeIcon className="inline ml-2" icon={faCheck} aria-label="Edit a profile" />
            </div>
        </div>
    );
}

function IndividualFamilyMember(props) {
    const { currUser, familyMember, newFamilyInfo, newFamilyInfoCallback, isEditing } = props;
    const [isRemoved, setIsRemoved] = useState(false);
    const fullName = familyMember.firstName + ' ' + familyMember.lastName;
    let removeSymbol = '';

    const handleRemoveFamilyMember = () => {
        setIsRemoved(!isRemoved);
        let editedFamilyInfo = [...newFamilyInfo];
        if (!isRemoved) {
            editedFamilyInfo = newFamilyInfo.filter(person => {

                // Might be buggy. Replace with index?
                return !_.isEqual(familyMember, person);
            });
        }
        newFamilyInfoCallback([...editedFamilyInfo]);
    }

    if (isEditing && currUser.isAdmin) {
        removeSymbol = <FontAwesomeIcon className="ml-4 text-[#FF0000] hover:cursor-pointer" icon={faXmark} size="lg" onClick={handleRemoveFamilyMember} aria-label="Remove a family member" />
    }
    return (
        <div className="p-1">
            <img className="rounded-full inline w-10 h-10 mb-2" src={familyMember.img} alt={fullName} />
            <p className={'inline p-3 ' + (isRemoved ? 'line-through' : '')}>{fullName}</p>
            {removeSymbol}
        </div>
    )
}