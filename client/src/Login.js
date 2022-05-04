// Import FirebaseAuth and firebase.
import React from 'react';
import { Link } from 'react-router-dom';
import { SingleFormInput } from './Signup.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const apiEndpoint = "http://localhost:5000/api/v1/"

const UI_CONFIG = {
  signInFlow: 'popup',
  signInSuccessUrl: '/home',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    }
  ]
};

const INPUTS = [
  'Email',
  'Password'
];

export default function Login(props) {

  const handleClick = () => {
    userLogin(props);
  }
  const formInputArray = INPUTS.map((input, index) => {
    return <SingleFormInput input={input} callback={handleClick} key={index} />
  });
  return (
    <div className="flex flex-col bg-light-green w-[50%] py-4 mx-auto">
      <h1 className="text-center font-heading text-3xl pb-3">Sign In</h1>
      <p className="text-center text-2xl pb-3">Please choose a sign-in method:</p>
      <div>
        {formInputArray}
      </div>
      <p className="mx-auto error_message bg-red"></p>
      <p className="mx-auto py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold" onClick={handleClick}>
        Sign In
      </p>
      <p className="text-center pb-3">Don't have an account? <Link className="text-light-blue underline" to="/signup">Sign up here!</Link></p>
    </div>
  );
}

async function userLogin(props) {
  let email = document.querySelector("#root > div > div > div > form:nth-child(1) > input").value;
  let password = document.querySelector("#root > div > div > div > form:nth-child(2) > input").value;

  try {
    let response = await fetch(apiEndpoint + "userlogin", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      mode: 'cors'
    })

    let responseJSON = await response.json();
    let string = JSON.stringify(responseJSON);

    if (string.includes('Error')) {
      document.querySelector("#root > div > div > p.mx-auto.error_message.bg-red").textContent = string;
    }

    if (string.includes('success')) {
      console.log("Login Successful");
      // Redirect to dashboard page
      props.loginStatus();
    }
  } catch (error) {
    console.log(error)
  }
}