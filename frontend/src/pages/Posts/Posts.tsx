import React from 'react';
import { Card } from '@mui/material';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';

export const Posts = () => {
    if  (!auth.isAuth) {
      return <Navigate to="/login"/>;
    }
  return (
    <Card>
    This is posts
      {auth.username}
    </Card>
  );
};
