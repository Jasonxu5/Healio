// Import FirebaseAuth and firebase.
import React from 'react';
import { Link } from 'react-router-dom';
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
export default function Signup() {

    const formInputArray = INPUTS.map((input, index) => {
        return <SingleFormInput input={input} key={index} />
    });
    return (
        <div className="flex flex-col bg-light-green w-[25%] py-4 mx-auto">
            <h1 className="text-center font-heading text-3xl pb-3">Sign Up</h1>
            <div>
                {formInputArray}
            </div>
            <p className="mx-auto py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold" onClick={createUser}>
                Create Account
            </p>
            <p className="text-center pb-3 mt-2">Already have an account? <Link className="text-light-blue underline" to="/login">Log in here!</Link></p>
        </div>
    );
}

export async function createUser() {
    // refactor this later if there's time otherwise it works fine
    let first = document.querySelector("#root > div > div > div > form:nth-child(1) > input").value;
    let last = document.querySelector("#root > div > div > div > form:nth-child(2) > input").value;
    let email = document.querySelector("#root > div > div > div > form:nth-child(3) > input").value;
    let pass = document.querySelector("#root > div > div > div > form:nth-child(4) > input").value;
    let isManager = undefined
    if (document.querySelector("#root > div > div > div > div > form > div:nth-child(1) > input[type=radio]").checked) {
        isManager = true;
    } else {
        isManager = false;
    }

    let array = [first, last, email, pass, isManager]

    for (let i = 0; i < array.length; i++) {
        if (array[i] === '') {
            // See Line 96 for suggested improvement
            document.querySelector("#root > div > div > p.mx-auto.py-3.px-6.border-2.border-light-blue.bg-\\[\\#FFFFFF\\].rounded-\\[15px\\].hover\\:cursor-pointer.hover\\:bg-light-blue.hover\\:font-bold").textContent = "One or more fields are empty"
            return;
        }
    }

    try {
        console.log(isManager);
        let response = await fetch(apiEndpoint + "user", {
            method: "POST",
            body: JSON.stringify({ first_name: first, last_name: last, email: email, password: pass, isFamilyManager: isManager }),
            headers: { 'Content-Type': 'application/json' }
        })
        let responseJSON = await response.json();
        let string = JSON.stringify(responseJSON);
        if (string.includes('Error')) {
            document.querySelector("#root > div > div > p.mx-auto.py-3.px-6.border-2.border-light-blue.bg-\\[\\#FFFFFF\\].rounded-\\[15px\\].hover\\:cursor-pointer.hover\\:bg-light-blue.hover\\:font-bold").textContent = "Another account already exists with this email"
            // Try to display a <p> Element instead: return (<div><p>Error: Another account already exists with this email.</p></div>)
        } else { // {status : success}
            document.querySelector("#root > div > div > p.mx-auto.py-3.px-6.border-2.border-light-blue.bg-\\[\\#FFFFFF\\].rounded-\\[15px\\].hover\\:cursor-pointer.hover\\:bg-light-blue.hover\\:font-bold").textContent = "Success!"
            // Redirect page to Login Page
        }

    } catch (error) {
        console.log("Error" + error);
    }
}

export function SingleFormInput(props) {
    const { input } = props;
    let inputType;
    if (input === 'Password') {
        inputType = 'password';
    } else if (input === 'Email') {
        inputType = 'email';
    } else {
        inputType = '';
    }

    if (input !== 'Admin') {
        return (
            <form className="ml-10 pb-3">
                <label className="text-2xl pb-3">{input + ':'}</label>
                <input className="block p-[12px] w-[75%] mt-3 rounded-[15px] bg-grey" type={inputType}
                    placeholder={'Type ' + input + ' here...'} aria-label={'Type in your ' + input} autoComplete="off" />
            </form>
        )
    } else {
        return (
            <div className="ml-10 pb-3">
                <p className="text-2xl pb-3">Do you manage your family?</p>
                <form className="flex gap-5">
                    <div>
                        <input type="radio" name="admin-access" value="yes" />
                        <label className="ml-2" htmlFor="yes">Yes</label>
                    </div>
                    <div>
                        <input type="radio" name="admin-access" value="no" />
                        <label className="ml-2" htmlFor="no">No</label>
                    </div>
                </form>
            </div>
        )
    }
}