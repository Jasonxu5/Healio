// Import FirebaseAuth and firebase.
import React from 'react';
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

// h1 element not showing up
export default function Login() {
  console.log('success');
  return (
    <div>
      <h1 className=''>Healio Sign In</h1>
      <p className='absolute right-[+850px]'>Please choose a sign-in method:</p>
      <StyledFirebaseAuth uiConfig={UI_CONFIG} firebaseAuth={firebase.auth()} />
    </div>
  );
}