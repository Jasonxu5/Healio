import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import NavBar from './NavBar.js';
import Header from './Header.js';

import Health from './Health.js';
import PatientInfo from './PatientInfo.js';

import ViewApps from './ViewApps.js';
import ScheduleApps from './ScheduleApps.js';

import Messaging from './Messaging.js';

import FindProviders from './FindProviders.js';
import FindHospitals from './FindHospitals.js';
import Education from './Education.js';

import Profile from './Profile.js';
import PlaceHolder from './Template.js';

import Landing from './Landing.js';

import katie from './img/katie.png';
import daughter from './img/daughter.png';
import grandma from './img/grandma.png';
import ortega from './img/ortega.png'; // profile picture
import montgomery from './img/montgomery.jpeg';
import valera from './img/valera.png';
import cain from './img/cain.jpeg'; // profile picture
import martinez from './img/martinez.jpeg';
import candice from './img/candice.png';
import { FirebaseError } from 'firebase/app';

const apiEndpoint = "http://localhost:5000/api/v1/"

// i'm sorry but i can't parse images in json files
// cut down this array later, keep it hardcoded for now
const FAMILY_INFO = [
  {
    firstName: '',
    lastName: '',
    img: katie,
    notifications: [
      'You have a new message from Dr. Osborn!',
      'Your recent lab results have arrived!',
      'Receipt of your payment for appointment on 02/09/22',
      'You have a new message from Dr. Ortega!'
    ],
    labResults: [
      {
        date: new Date('February 10, 2022'),
        name: 'Radiology - Chest X Ray',
        doctor: 'Dr. Ortega',
        status: 'Available'
      },
      {
        date: new Date('January 4, 2022'),
        name: 'Sonography - Ultrasound',
        doctor: 'Dr. Montgomery',
        status: 'Complete'
      }
    ],
    medications: [
      {
        date: new Date('February 9, 2022'),
        name: 'Amoxicillin (Amoxil)',
        doctor: 'Dr. Ortega',
        status: 'Active'
      },
      {
        date: new Date('January 17, 2022'),
        name: 'Fluoxetine (Prozac)',
        doctor: 'Dr. Cain',
        status: 'Active'
      },
      {
        date: new Date('November 21, 2021'),
        name: 'Doxyxycline',
        doctor: 'Dr. Martinez',
        status: 'Inactive'
      }
    ],
    vaccines: [],
    allergies: [],
    surgeries: [],
    doctorNotes: {
      date: '02/09/2021',
      body: 'Mrs. Wang is a 40 year old woman with complaints of fatigue and a sore throat since yesterday morning. She has no difficulty swallowing, but doing so makes the pain worse. Reported recording a temp of 100.7 last night. ' +
        'Probable infection, Mrs. Wang reported no allergies or sick contacts at work, but her daughter recently stayed home from school because of strep throat.',
      doctor: 'Dr. Ortega'
    },
    appointments: [
      { name: 'Follow up with Dr. Ortega', date: new Date('February 12, 2022') },
      { name: 'Yearly check-up with Dr. Osborn', date: new Date('February 15, 2022') }
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
      {
        date: new Date('February 5, 2022'),
        name: 'Allergen Testing',
        doctor: 'Dr. Ortega',
        status: 'Active'
      }
    ],
    medications: [],
    vaccines: [],
    allergies: [],
    surgeries: [],
    doctorNotes: {
      date: '02/06/2022',
      body: 'Daughter Wang came home from school yesterday with a very sore throat and recorded a fever that night. She reported no other symptoms and has been taking ibuprofen for the fever. ' +
        'Probable infection, recommended stay home from school, the likely the place of contraction.',
      doctor: 'Dr. Ortega'
    },
    appointments: [
      { name: 'Yearly check-up with Dr. Osborn', date: new Date('February 15, 2022') }
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
    labResults: [],
    vaccines: [],
    allergies: [],
    surgeries: [],
    medications: [
      {
        date: new Date('February 5, 2022'),
        name: 'Acetaminophen',
        doctor: 'Dr. Valera',
        status: 'Active'
      }
    ],
    doctorNotes: {
      date: '02/08/2021',
      body: 'Grandma Wang was accompanied by her daughter Katie who reported that Mrs. Wang has been experiencing pain, stiffness, and decreased range of motion in her joints. She has been taking tylenol for the pain and vitamins for her health. ' +
        'Possible arthritis, follow up x-rays will be taken to determine the cause.',
      doctor: 'Dr. Valera'
    },
    appointments: [
      { name: 'Yearly check-up with Dr. Osborn', date: new Date('February 15, 2022') },
      { name: 'Follow up with Dr. Valera', date: new Date('February 21, 2022') }
    ],
    isAdmin: false
  }
];

const DOCTOR_INFO = [
  {
    name: 'Dr. Ortega',
    img: ortega,
    speciality: 'General Practioner'
  },
  {
    name: 'Dr. Montgomery',
    img: montgomery,
    speciality: 'Diagonstic Ultrasound'
  },
  {
    name: 'Dr. Valera',
    img: valera,
    speciality: 'Radiology'
  },
  {
    name: 'Dr. Cain',
    img: cain,
    speciality: 'Pharmacy'
  },
  {
    name: 'Dr. Martinez',
    img: martinez,
    speciality: 'Bacteriology'
  },
  {
    name: 'Dr. Candice Knots',
    img: candice,
    speciality: 'Maxillofacial Surgery'
  }
];

// NOTE: Use Environement Variables once app is deployed to production
// const firebaseConfig = {
//   apiKey: "AIzaSyAGSZzesnF02c38v_XRDH0ZjtAQnxltI10",
//   authDomain: "healio-e7722.firebaseapp.com",
//   projectId: "healio-e7722",
//   storageBucket: "healio-e7722.appspot.com",
//   messagingSenderId: "920066944228",
//   appId: "1:920066944228:web:0d00c25c07d1b2c1b890f1"
// };

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [data, setData] = useState("");
  const [currUser, setCurrUser] = useState(FAMILY_INFO[0]);
  const [familyInfo, setFamilyInfo] = useState(FAMILY_INFO);

  async function currentUser(user) {
    FAMILY_INFO[0].firstName = user.first_name;
    FAMILY_INFO[0].lastName = user.last_name;
  }

  async function loginStatus() {
    let response = await fetch(apiEndpoint + `currentCookie`,
      {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        mode: 'cors'
      })

    let responseJSON = await response.json();
    let string = JSON.stringify(responseJSON);

    if (string.includes('Error')) {
      setIsSignedIn(false);
    } else {
      setIsSignedIn(true);
      let json = JSON.parse(string)
      console.log(json);
      currentUser(json);
    }
  }
  loginStatus();


  // Scroll lock on messages
  if (useLocation().pathname === '/messages') {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  // Headers for each page, not sure if there's a better way to do this
  const healthHeader = <Header title={'Overview'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} loginStatus={loginStatus} />;
  const labResultsHeader = <Header title={'Lab Results'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />
  const medicationsHeader = <Header title={'Medications'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />
  const vaccinesHeader = <Header title={'Vaccines'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />
  const allergiesHeader = <Header title={'Allergies'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />
  const surgeriesHeader = <Header title={'Surgeries'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />

  const viewAppsHeader = <Header title={'Appointments'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />;
  const scheduleAppsHeader = <Header title={'Schedule Appointment'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />;

  const messagingHeader = <Header title={'Messaging'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />;

  const findProvidersHeader = <Header title={'Find Providers'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />;
  const findHospitalsHeader = <Header title={'Find Hospitals'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />;
  const educationHeader = <Header title={'Learn More'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />;

  const profileHeader = <Header title={'Your Profile'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />;

  const templateHeader = <Header title={'To be worked on ...'} currUser={currUser} setUserCallback={setCurrUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} />;

  if (isSignedIn) {
    return (
      <div className="bg-gradient-to-br from-pale-blue to-white">
        <Routes>
          <Route path="/health" element={<Health currUser={currUser} healthHeader={healthHeader} />} />
          <Route path="/health/overview" element={<Health currUser={currUser} healthHeader={healthHeader} />} />
          <Route path="/health/lab_results" element={<PatientInfo currUser={currUser} userHealthInfo={currUser.labResults} infoHeader={labResultsHeader} />} />
          <Route path="/health/medications" element={<PatientInfo currUser={currUser} userHealthInfo={currUser.medications} infoHeader={medicationsHeader} />} />
          <Route path="/health/vaccines" element={<PatientInfo currUser={currUser} userHealthInfo={currUser.vaccines} infoHeader={vaccinesHeader} />} />
          <Route path="/health/allergies" element={<PatientInfo currUser={currUser} userHealthInfo={currUser.allergies} infoHeader={allergiesHeader} />} />
          <Route path="/health/surgical_history" element={<PatientInfo currUser={currUser} userHealthInfo={currUser.surgeries} infoHeader={surgeriesHeader} />} />
          <Route path="/appointments" element={<ViewApps currUser={currUser} viewAppsHeader={viewAppsHeader} />} />
          <Route path="/appointments/view_appointments" element={<ViewApps currUser={currUser} viewAppsHeader={viewAppsHeader} />} />
          <Route path="/appointments/schedule_appointment" element={<ScheduleApps currUser={currUser} scheduleAppsHeader={scheduleAppsHeader} />} />
          <Route path="/messages" element={<Messaging currUser={currUser} messagingHeader={messagingHeader} />} />
          <Route path="/resources" element={<FindProviders doctorInfo={DOCTOR_INFO} findProvidersHeader={findProvidersHeader} />} />
          <Route path="/resources/find_providers" element={<FindProviders doctorInfo={DOCTOR_INFO} findProvidersHeader={findProvidersHeader} />} />
          <Route path="/resources/find_hospitals" element={<FindHospitals findHospitalsHeader={findHospitalsHeader} />} />
          <Route path="/resources/educational_providers" element={<Education educationHeader={educationHeader} />} />
          <Route path="/profile" element={<Profile currUser={currUser} familyInfo={familyInfo} familyInfoCallback={setFamilyInfo} profileHeader={profileHeader} />} />
          <Route path="*" element={<Navigate replace to="/health" />} />
        </Routes>
        <NavBar loginStatus={loginStatus} />
        <p>{!data ? "" : data}</p>
      </div>

    );
  } else {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Landing loginStatus={loginStatus} />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    )
  }
}

export default App;