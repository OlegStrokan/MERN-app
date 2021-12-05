import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';
import { getFromLS } from '../../utils/localStorage/getFromLS';

export const Profile = () => {
  React.useEffect(() => {

  }, [auth.isAuth])

    if  (!auth.isAuth) {
      return <Navigate to="/login"/>;
    }

    const token = getFromLS('token', 'token')

  return (
    <Card>
    This is posts
      <Typography variant="h6">{auth.user.username}</Typography>
    <Typography variant="h6">{token}</Typography>
      <Button variant="outlined" onClick={() => auth.logout(auth.user._id)}>Logout</Button>
    </Card>
  );
};
