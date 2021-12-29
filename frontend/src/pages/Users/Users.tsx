import React from 'react';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { users } from '../../mobx/users';
import { observer } from 'mobx-react-lite';

export const Users: React.FC = observer(() => {
  React.useEffect(() => {

  }, [auth.isAuth])

  if  (!auth.isAuth) {
    return <Navigate to="/login"/>;
  }

  return (
    <Card>
      {users.users.length !== 0 && users.users.map((user) => {
       return <Card sx={{ p: 2, m: 2}}>
        <Typography>Username: {user.username}</Typography>
        <Typography>Full name: {user.fullname}</Typography>
        </Card>
      })}
    </Card>
  );
});
