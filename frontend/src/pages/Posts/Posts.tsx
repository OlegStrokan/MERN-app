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
      {auth.user.posts?.length === 0
        ? <Typography variant="h6">This user don't have any posts</Typography>
        : <Typography variant="h6">{auth.user.username}'s posts</Typography>
      }

    </Card>
  );
};
