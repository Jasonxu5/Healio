// Import FirebaseAuth and firebase.
import React from 'react';
import { Link } from 'react-router-dom';
import { SingleFormInput } from './Signup.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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
  'Email',
  'Password'
];

export default function Login() {
  const formInputArray = INPUTS.map((input, index) => {
    return <SingleFormInput input={input} key={index} />
  });

  return (
    <div className="bg-light-green w-[25%] py-4 mx-auto">
      <h1 className="text-center font-heading text-3xl pb-3">Healio Sign In</h1>
      <p className="text-center text-2xl pb-3">Please choose a sign-in method:</p>
      <StyledFirebaseAuth uiConfig={UI_CONFIG} firebaseAuth={firebase.auth()} />
      <div>
        {formInputArray}
      </div>
      <p className="text-center pb-3">Don't have an account? <Link className="text-light-blue underline" to="/signup">Sign up here!</Link></p>
    </div>
  );
}