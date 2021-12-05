import React from 'react';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
React.useEffect(() => {

})
  return (
    <div>
      <nav className="Nav">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    <Routes>
      <Route path='/' element={ <Navigate to={'/login'}/>}/>
      <Route  path="/login" element={<Login />}/>
      <Route  path="/profile" element={<Profile />}/>
    </Routes>
    </div>
  );
};
