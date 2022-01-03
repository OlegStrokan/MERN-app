import React from 'react';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { UserDto } from '../../types/user.dto';
import { usersState } from '../../mobx/users';

export const Users: React.FC = observer(() => {
  const [users, setUsers] = React.useState<UserDto[] | null>(null);

  React.useEffect(() => {
    // @ts-ignore
    setUsers(usersState.getUsers());
  }, [auth.isAuth])

  if  (!auth.isAuth) {
    return <Navigate to="/login"/>;
  }

  if (!users) {
    return <div>...Loading</div>
  }

  return (
    <Card>
      {users.map((user) => {
       return <Card sx={{ p: 2, m: 2}}>
        <Typography>Username: {user.username}</Typography>
        <Typography>Full name: {user.fullname}</Typography>
        </Card>
      })}
    </Card>
  );
});
