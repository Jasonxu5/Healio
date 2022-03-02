import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import NavBar from './NavBar.js';
import Health from './Health.js';
import Messaging from './Messaging.js';
import PlaceHolder from './Template.js';

import LandingHeader from './LandingHeader.js';

import katie from './img/katie.png'; // profile picture
import daughter from './img/daughter.png';
import grandma from './img/grandma.png';

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

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true); // change to false after user acc implemented
  const [data, setData] = useState("")
  const [currUser, setCurrUser] = useState(FAMILY_INFO[0]);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message))
  }, [])

  console.log(data)

  if (isSignedIn) {
    return (
      <div className="flex bg-gradient-to-br from-pale-blue to-white">
        <NavBar signedIn={setIsSignedIn} />
        <Routes>
          <Route exact path="/" element={<Health currUser={currUser} familyInfo={FAMILY_INFO} setUserCallback={setCurrUser} signedIn={setIsSignedIn} />} />
          <Route path="/appointments" element={<PlaceHolder />} />
          <Route path="/messages" element={<Messaging />} />
          <Route path="/resources" element={<PlaceHolder />} />
          <Route path="/billing" element={<PlaceHolder />} />
          <Route path="/profile" element={<PlaceHolder />} />
        </Routes>
        <p>{!data ? "" : data}</p>
      </div>

    );
  } else {
    return (
      <div>
        <LandingHeader signedIn={setIsSignedIn} />
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