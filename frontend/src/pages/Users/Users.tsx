import React from 'react';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { usersState } from '../../mobx/users';

export const Users: React.FC = observer(() => {

  React.useEffect(() => {
    usersState.getUsers()
  }, [auth.isAuth])

  if  (!auth.isAuth) {
    return <Navigate to="/login"/>;
  }

  return (
    <Card>
      {usersState.users.length !== 0 ? usersState.users.map((user) => {
       return <Card sx={{ p: 2, m: 2}}>
        <Typography>Username: {user.username}</Typography>
        <Typography>Full name: {user.fullname}</Typography>
        </Card>
      }) : <div>...Loading</div>}
    </Card>
  );
});
