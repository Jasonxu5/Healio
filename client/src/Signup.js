// Import FirebaseAuth and firebase.
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const apiEndpoint = "http://localhost:5000/api/v1/"

// Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: '/home',
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   ],
// };

const UI_CONFIG = {
    signInFlow: 'popup',
    signInSuccessUrl: '/home',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        }
    ]
    // callbacks: {
    //   signInSuccessWithAuthResult: () => false
    // },
};

const INPUTS = [
    "First Name",
    "Last Name",
    "Email",
    "Password",
    "Admin"
];
export default function Signup(props) {
    const { loginStatus, isLoginClicked, loginClickedCallback, loginRef, loginCallback } = props;
    const [getFirstName, setFirstName] = useState('');
    const [getLastName, setLastName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPass, setPass] = useState('');
    const [getAdmin, setAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const callbackArray = [setFirstName, setLastName, setEmail, setPass, setAdmin];

    const handleClick = () => {
        createUser(loginStatus, getFirstName, getLastName, getEmail, getPass, getAdmin, setErrorMessage);
    };

    const formInputArray = INPUTS.map((input, index) => {
        return <SingleFormInput input={input} submitCallback={handleClick} inputCallback={callbackArray[index]} key={index} />
    });

    return (
        <Modal className="sm:w-[400px] sm:left-[15%] md:w-[550px] md:left-[20%] absolute left-[25%] top-[10%] w-[750px] h-[500px] p-5 bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] z-[150] overflow-y-auto" show={isLoginClicked} ref={loginRef}>
            <FontAwesomeIcon className="text-2xl mb-2 hover:text-[#FF0000] hover:cursor-pointer" onClick={() => loginClickedCallback(false)} icon={faX} size="lg" aria-label="Close icon" />
            <Modal.Header className="text-center" closeButton>
                <Modal.Title className="font-header text-3xl">Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
                {formInputArray}
            </Modal.Body>
            <p className="mx-auto bg-red">{errorMessage}</p>
            <p className="mx-auto py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold" onClick={handleClick}>
                Create Account
            </p>
            <Modal.Footer className="text-center pb-3">
                Already have an account? <p className="text-light-blue underline hover:cursor-pointer" onClick={() => loginCallback(true)}>Log in here!</p>
            </Modal.Footer>
        </Modal>
    );
}

async function createCookie(email, pass) {
    try {
        let response = await fetch(apiEndpoint + "userlogin", {
            method: "POST",
            body: JSON.stringify({ email: email, password: pass }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            mode: 'cors'
        })

        let responseJSON = await response.json();
        let string = JSON.stringify(responseJSON);
        return string;
    } catch (error) {
        console.log(error);
    }
}

export async function createUser(loginStatus, first, last, email, pass, isManager, errorCallback) {
    let array = [first, last, email, pass, isManager]

    for (let i = 0; i < array.length; i++) {
        if (array[i] === '') {
            errorCallback('One or more fields are empty');
            return;
        }
    }

    try {
        let response = await fetch(apiEndpoint + "user", {
            method: "POST",
            body: JSON.stringify({ first_name: first, last_name: last, email: email, password: pass, isFamilyManager: isManager }),
            headers: { 'Content-Type': 'application/json' }
        })
        let responseJSON = await response.json();
        let string = JSON.stringify(responseJSON);
        if (string.includes('Error')) {
            errorCallback('Another account already exists with this email');
        } else { // {status : success}
            errorCallback('Success!');
            let output = await createCookie(email, pass);

            if (output.includes('success')) {
                loginStatus();
            }
        }
    } catch (error) {
        console.log("Error" + error);
    }
}

export function SingleFormInput(props) {
    const { input, submitCallback, inputCallback } = props;
    let inputType;
    if (input === 'Password') {
        inputType = 'password';
    } else if (input === 'Email') {
        inputType = 'email';
    } else {
        inputType = '';
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleTextChange = (event) => {
        inputCallback(event.target.value);
    }

    const handleButtonClick = (event) => {
        if (event.target.value === 'yes') {
            inputCallback(true);
        } else {
            inputCallback(false);
        }
    }

    const handleKeypress = (event) => {
        if (event.key === 'Enter') {
            submitCallback()
        }
    };
    if (input !== 'Admin') {
        return (
            <form className="ml-10 pb-3" onSubmit={handleSubmit}>
                <label className="text-2xl pb-3">{input + ':'}</label>
                <input className="block p-[12px] w-[75%] mt-3 rounded-[15px] bg-grey" type={inputType}
                    placeholder={'Type ' + input + ' here...'} aria-label={'Type in your ' + input} autoComplete="off"
                    onKeyDown={handleKeypress} onChange={handleTextChange} />
            </form>
        )
    } else {
        return (
            <div className="ml-10 pb-3">
                <p className="text-2xl pb-3">Do you manage your family?</p>
                <form className="flex gap-5">
                    <div>
                        <input type="radio" name="admin-access" value="yes" onClick={handleButtonClick} />
                        <label className="ml-2" htmlFor="yes">Yes</label>
                    </div>
                    <div>
                        <input type="radio" name="admin-access" value="no" onClick={handleButtonClick} />
                        <label className="ml-2" htmlFor="no">No</label>
                    </div>
                </form>
            </div>
        )
    }
}