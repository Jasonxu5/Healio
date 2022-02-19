import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar.js';
import Health from './Health.js';
import Messaging from './Messaging.js';
import PlaceHolder from './Template.js';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true); // change to false after user acc implemented
  if (isSignedIn) {
    return (
      <div className="flex bg-gradient-to-br from-sky-blue to-white">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Health />} />
          <Route path="/appointments" element={<PlaceHolder />} />
          <Route path="/messages" element={<Messaging />}/>
          <Route path="/resources" element={<PlaceHolder />} />
          <Route path="/billing" element={<PlaceHolder />} />
          <Route path="/profile" element={<PlaceHolder />} />
        </Routes>
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
