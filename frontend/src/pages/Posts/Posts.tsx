import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';
import { getFromLS } from '../../utils/localStorage/getFromLS';

export const Posts = () => {
  React.useEffect(() => {

  }, [auth.isAuth])

    if  (!auth.isAuth) {
      return <Navigate to="/login"/>;
    }


  return (
    <Card>
    This is posts
      <Typography variant="h6">{auth.user.username}</Typography>
      <Button variant="outlined" onClick={() => window.location.reload()}>Logout</Button>
    </Card>
  );
};
