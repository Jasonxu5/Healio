import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar.js';
import Health from './Health.js';
import Messaging from './Messaging.js';
import PlaceHolder from './Template.js';

import katie from './img/katie.png'; // profile picture

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
      { title: 'X-Ray - Katie Wong', date: '02/10/2022' },
      { title: 'Ultrasound - Katie Wong', date: '01/04/2022' }
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
    img: katie,
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
    img: katie,
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
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Health currUser={currUser} familyInfo={FAMILY_INFO} />} />
          <Route path="/appointments" element={<PlaceHolder />} />
          <Route path="/messages" element={<Messaging />} />
          <Route path="/resources" element={<PlaceHolder />} />
          <Route path="/billing" element={<PlaceHolder />} />
          <Route path="/profile" element={<PlaceHolder />} />
        </Routes>
        <p>{!data ? "Server Error" : data}</p>
      </div>

    );
  } else {
    return (
      <div>

      </div>
    )
  }
}

export default App;
