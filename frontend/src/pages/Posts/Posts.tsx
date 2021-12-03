import React from 'react';
import { Card } from '@mui/material';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';
import { getFromLS } from '../../utils/localStorage/getFromLS';

export const Posts = () => {
    if  (!auth.isAuth) {
      return <Navigate to="/login"/>;
    }
    const token = getFromLS('token', 'token')
  return (
    <Card>
    This is posts
      {auth.username}
      {token}
    </Card>
  );
};
