// Import FirebaseAuth and firebase.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SingleFormInput } from './Signup.js';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
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
  const { loginStatus, isLoginClicked, loginClickedCallback, loginRef, loginCallback } = props;
  const [getEmail, setEmail] = useState('');
  const [getPass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const callbackArray = [setEmail, setPass];

  const handleClick = () => {
    userLogin(loginStatus, getEmail, getPass, setErrorMessage);
  }
  const formInputArray = INPUTS.map((input, index) => {
    return <SingleFormInput input={input} submitCallback={handleClick} inputCallback={callbackArray[index]} key={index} />
  });
  return (
    <Modal className="modal" show={isLoginClicked} ref={loginRef}>
      <FontAwesomeIcon className="text-2xl mb-2 hover:text-[#FF0000] hover:cursor-pointer" onClick={() => loginClickedCallback(false)} icon={faX} size="lg" aria-label="Close icon" />
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="font-heading text-3xl">Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        {formInputArray}
      </Modal.Body>
      <p className="mx-auto bg-red">{errorMessage}</p>
      <p className="mx-auto w-[100px] py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold" onClick={handleClick}>
        Sign In
      </p>
      <Modal.Footer className="text-center pb-3">
        Don't have an account? <p className="text-light-blue underline hover:cursor-pointer" onClick={() => loginCallback(false)}>Sign up here!</p>
      </Modal.Footer>
    </Modal>
  );
}

async function userLogin(loginStatus, email, password, errorCallback) {
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
      errorCallback('Login failed');
    }

    if (string.includes('success')) {
      console.log("Login Successful");
      // Redirect to dashboard page
      loginStatus();
    }
  } catch (error) {
    console.log(error)
  }
}