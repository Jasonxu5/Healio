import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar.js';

function App() {
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
}

export default App;
