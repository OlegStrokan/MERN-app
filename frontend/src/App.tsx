import React from 'react';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Posts } from './pages/Posts/Posts';
import { Header } from './components/Header/Header';
import { Typography } from '@mui/material';

export const App = () => {
React.useEffect(() => {

})
  return (
    <div>
      <Header/>
      <nav className="Nav">
        <ul>
          <li>
            <Link to="/login"><Typography>Login</Typography></Link>
          </li>
          <li>
            <Link to="/profile"><Typography>Profile</Typography></Link>
          </li>
          <li>
            <Link to="/posts"><Typography>Posts</Typography></Link>
          </li>
        </ul>
      </nav>
    <Routes>
      <Route path='/' element={ <Navigate to={'/login'}/>}/>
      <Route  path="/login" element={<Login />}/>
      <Route  path="/profile" element={<Profile />}/>
      <Route  path="/posts" element={<Posts />}/>
    </Routes>
    </div>
  );
};
