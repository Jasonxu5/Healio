import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar.js';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true); // change to false after user acc implemented
  if (isSignedIn) {
    return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/">

          </Route>
          <Route path="/appointments">

          </Route>
          <Route path="/messages">

          </Route>
          <Route path="/resources">

          </Route>
          <Route path="/billing">

          </Route>
          <Route path="/profile">

          </Route>
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
