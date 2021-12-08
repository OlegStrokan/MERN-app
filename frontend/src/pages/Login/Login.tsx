import React from 'react';
import { Card } from '@mui/material';
import styles from './Login.module.css';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { observer } from 'mobx-react-lite';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';

export const Login:React.FC = observer(() => {
  const [register, setRegister] = React.useState<boolean>(true);

  if  (auth.isAuth) {
    return <Navigate to="/profile"/>;
  }

  const onModelChange = () => {
    setRegister(!register);
  };

  return (
    <Card className={styles.root}>
      {!register ? <SignUp onModelChange={onModelChange} /> : <SignIn onModelChange={onModelChange} />}
    </Card>
  );
})
