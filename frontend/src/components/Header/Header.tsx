import React from 'react';
import { AppBar, Box, Button, Card, IconButton, Toolbar, Typography } from '@mui/material';
import { auth } from '../../mobx/auth';
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

interface IHeader {
  openMenu: boolean;
  setOpenMenu: (state: boolean) => void;
}

export const Header: React.FC<IHeader> = ({openMenu, setOpenMenu}) => {

  const navigate = useNavigate()

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mern app
            </Typography>
            {!auth.isAuth
              ?  <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>Login</Button>
              : <Button variant="contained" color="secondary" onClick={() => auth.logout()}>Logout</Button>
            }
          </Toolbar>
        </AppBar>
      </Box>
  );
};
