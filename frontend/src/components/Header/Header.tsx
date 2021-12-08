import React from 'react';
import { Button, Card } from '@mui/material';
import { auth } from '../../mobx/auth';
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';

export const Header = () => {

  const navigate = useNavigate()

  return (
    <Card className={styles.root}>
      {!auth.isAuth
        ?  <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
        : <Button variant="contained" onClick={() => window.location.reload()}>Logout</Button>
      }
    </Card>
  );
};
