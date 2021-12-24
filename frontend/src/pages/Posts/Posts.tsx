import React from 'react';
import { Card, Typography } from '@mui/material';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export const Posts = observer(() => {
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
});
