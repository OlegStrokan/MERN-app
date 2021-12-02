import React from 'react';
import { Login } from './pages/Login/Login';
import { Posts } from './pages/Posts/Posts';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {

  return (
    <div>
      <nav className="Nav">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
    <Routes>
      <Route path='/' element={ <Navigate to={'/login'}/>}/>
      <Route  path="/login" element={<Login />}/>
      <Route  path="/posts" element={<Posts />}/>
    </Routes>
    </div>
  );
};
