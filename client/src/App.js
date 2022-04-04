import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import NavBar from './NavBar.js';
import Header from './Header.js';

import Health from './Health.js';
import Messaging from './Messaging.js';
import PlaceHolder from './Template.js';

import Landing from './Landing.js';
import Login from './Login.js';

import katie from './img/katie.png'; // profile picture
import daughter from './img/daughter.png';
import grandma from './img/grandma.png';
import { FirebaseError } from 'firebase/app';

const apiEndpoint = "http://localhost:5000/api/v1/"

// i'm sorry but i can't parse images in json files
const FAMILY_INFO = [
  {
    firstName: 'Katie',
    lastName: 'Wang',
    img: katie,
    notifications: [
      'You have a new message from Dr. Osborn!',
      'Your recent lab results have arrived!',
      'Receipt of your payment for appointment on 02/09/22',
      'You have a new message from Dr. Ortega!'
    ],
    labResults: [
      { title: 'X-Ray - Katie Wang', date: '02/10/2022' },
      { title: 'Ultrasound - Katie Wang', date: '01/04/2022' }
    ],
    doctorNotes: {
      date: '02/09/2021',
      body: 'Mrs. Wang is a 40 year old woman with complaints of fatigue and a soar throat since yesterday morning. She has no difficulty swallowing, but doing so makes the pain worse. Reported recording a temp of 100.7 last night. ' +
        'Probable infection, Mrs. Wang reported no allergies or sick contacts at work, but her daughter recently stayed home from school because of strep throat.',
      doctor: 'Dr. Ortega'
    },
    appointments: [
      { title: 'Follow up with Dr. Ortega', date: '02/12/2022' },
      { title: 'Yearly check-up with Dr. Osborn', date: '02/15/2022' }
    ],
    isAdmin: true
  },
  {
    firstName: 'Daughter',
    lastName: 'Wang',
    img: daughter,
    notifications: [
      'You have a new message from Dr. Osborn!',
      'New prescription added to your medications.',
      'Receipt of your payment for appointment on 02/06/22',
      'You have a new message from Dr. Ortega!'
    ],
    labResults: [
      { title: 'Allergen Testing - Daughter Wang', date: '01/15/2022' },
      { title: 'X-Ray - Daughter Wang', date: '12/28/2021' }
    ],
    doctorNotes: {
      date: '02/06/2022',
      body: 'Daughter Wang came home from school yesterday with a very sore throat and recorded a fever that night. She reported no other symptoms and has been taking ibuprofen for the fever. ' +
        'Probable infection, recommended stay home from school, the likely the place of contraction.',
      doctor: 'Dr. Ortega'
    },
    appointments: [
      { title: 'Yearly check-up with Dr. Osborn', date: '02/15/2022' }
    ],
    isAdmin: false
  },
  {
    firstName: 'Grandma',
    lastName: 'Wang',
    img: grandma,
    notifications: [
      'You have a new message from Dr. Osborn!',
      'New prescription added to your medications.',
      'Your recent lab results have arrived!',
      'Receipt of your payment for appointment on 02/08/22',
      'You have a new message from Dr. Ortega!',
      'New prescription added to your medications.'
    ],
    labResults: [
      { title: 'X-Ray - Grandma Wang', date: '02/08/2022' }
    ],
    doctorNotes: {
      date: '02/08/2021',
      body: 'Grandma Wang was accompanied by her daughter Katie who reported that Mrs. Wang has been experiencing pain, stiffness, and decreased range of motion in her joints. She has been taking tylenol for the pain and vitamins for her health. ' +
        'Possible arthritis, follow up x-rays will be taken to determine the cause.',
      doctor: 'Dr. Valera'
    },
    appointments: [
      { title: 'Yearly check-up with Dr. Osborn', date: '02/15/2022' },
      { title: 'Follow up with Dr. Valera', date: '02/21/2022' }
    ],
    isAdmin: false
  }
];

// NOTE: Use Environement Variables once app is deployed to production
const firebaseConfig = {
  apiKey: "AIzaSyAGSZzesnF02c38v_XRDH0ZjtAQnxltI10",
  authDomain: "healio-e7722.firebaseapp.com",
  projectId: "healio-e7722",
  storageBucket: "healio-e7722.appspot.com",
  messagingSenderId: "920066944228",
  appId: "1:920066944228:web:0d00c25c07d1b2c1b890f1"
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [data, setData] = useState("");
  const [currUser, setCurrUser] = useState(FAMILY_INFO[0]);

  useEffect(() => {
    // fetch('/api')
    //   .then((res) => res.json())
    //   .then((data) => setData(data.message))
    //   .catch((error) => { console.log(error) });

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
    const getUser = async () => {
      try {
        const token = await firebase.auth().currentUser.getIdToken(true);
        // console.log(firebase.auth.currentUser);
        const req = await fetch(apiEndpoint + "user", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });
        console.log(req);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setIsSignedIn(true);
        //setCurrUser(firebaseUser);
      } else {
        // only change isLoggedIn when it's true
        if (isSignedIn) {
          setIsSignedIn(false);
        }

        // setCurrUser(null);
      }
    })

    return function cleanup() {
      authUnregisterFunction();
    }
  }, [isSignedIn])

  // console.log(data)

  // Scroll lock on messages
  if (useLocation().pathname === '/messages') {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  // Headers for each page, not sure if there's a better way to do this
  const homeHeader = <Header title={'Overview'} currUser={currUser} familyInfo={FAMILY_INFO} setUserCallback={setCurrUser} />;
  const messagingHeader = <Header title={'Messaging'} currUser={currUser} familyInfo={FAMILY_INFO} setUserCallback={setCurrUser} />;
  const templateHeader = <Header title={'To be worked on ...'} currUser={currUser} familyInfo={FAMILY_INFO} setUserCallback={setCurrUser} />;

  if (isSignedIn) {
    return (
      <div className="bg-gradient-to-br from-pale-blue to-white">
        <Routes>
          <Route path="/home" element={<Health currUser={currUser} homeHeader={homeHeader} />} />
          <Route path="/appointments" element={<PlaceHolder currUser={currUser} templateHeader={templateHeader} />} />
          <Route path="/messages" element={<Messaging currUser={currUser} messagingHeader={messagingHeader} />} />
          <Route path="/resources" element={<PlaceHolder currUser={currUser} templateHeader={templateHeader} />} />
          <Route path="/profile" element={<PlaceHolder currUser={currUser} templateHeader={templateHeader} />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
        <NavBar />
        <p>{!data ? "" : data}</p>
      </div>

    );
  } else {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    )
  }
}

export default App;

/*
APP ROUTES
          <Route path="/appointments" element={<PlaceHolder currUser={currUser} familyInfo={FAMILY_INFO} setUserCallback={setCurrUser} />} />
          <Route path="/messages" element={<Messaging currUser={currUser} familyInfo={FAMILY_INFO} setUserCallback={setCurrUser} />} />
          <Route path="/resources" element={<PlaceHolder currUser={currUser} familyInfo={FAMILY_INFO} setUserCallback={setCurrUser} />} />
          <Route path="/billing" element={<PlaceHolder currUser={currUser} familyInfo={FAMILY_INFO} setUserCallback={setCurrUser} />} />
          <Route path="/profile" element={<PlaceHolder currUser={currUser} familyInfo={FAMILY_INFO} setUserCallback={setCurrUser} />} />

MESSAGING
import Header from './Header.js';

export default function Messaging(props) {
    const { currUser, familyInfo, setUserCallback } = props;
    return (
        <Header title={'Messaging'} currUser={currUser} familyInfo={familyInfo} setUserCallback={setUserCallback}/>
    );
}

TEMPLATE
import Header from './Header.js';

export default function PlaceHolder(props) {
    const { currUser, familyInfo, setUserCallback } = props;
    return (
        <div className="flex flex-col">
            <Header title={'To be worked on ...'} currUser={currUser} familyInfo={familyInfo} setUserCallback={setUserCallback} />
        </div>
    );
}
*/