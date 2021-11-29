import React from 'react';
import { Card } from '@mui/material';
import styles from './Login.module.css';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export function Login() {
  const [register, setRegister] = React.useState<boolean>(true);

  const onModelChange = () => {
    setRegister(!register);
  };

  return (
    <Card className={styles.root}>
      {register ? <SignUp onModelChange={onModelChange} /> : <SignIn onModelChange={onModelChange} />}
    </Card>
  );
}
