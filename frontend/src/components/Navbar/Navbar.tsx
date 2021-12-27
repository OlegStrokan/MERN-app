import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from '@mui/material';

export const Navbar = () => {
  return (
    <Card>
      <ul>
        <li>
          <Link to="/login"><Typography variant="h5">Login</Typography></Link>
        </li>
        <li>
          <Link to="/profile"><Typography variant="h5">Profile</Typography></Link>
        </li>
        <li>
          <Link to="/users"><Typography variant="h5">Users</Typography></Link>
        </li>
        <li>
          <Link to="/posts"><Typography variant="h5">Posts</Typography></Link>
        </li>
      </ul>
    </Card>
  );
};
