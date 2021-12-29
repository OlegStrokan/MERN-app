import React from 'react';
import { Button, Card, TextField, Typography } from '@mui/material';
import { auth } from '../../mobx/auth';
import { Navigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../utils/validators/updateProfile';
import styles from './Profile.module.css'
import { observer } from 'mobx-react-lite';

export const Profile: React.FC = observer(() => {

  const {
    register, control, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {

  }, [auth.isAuth, auth.user])

  if (!auth.isAuth) {
    return <Navigate to="/login"/>;
  }

  const onSubmit = (event: any) => {
   auth.updateProfile(auth.user._id as string, event.email, event.username, event.fullname).then(() => setEditMode(false))
  }

  return (
    <Card sx={{ p: 2 }}>
      {!editMode
        ?
        <>
         {!auth.user.isActivated && <Typography variant="h5" sx={{ m: 2 }}>You need activate account! Please, check your email</Typography> }
          <Typography variant="h5" sx={{ m: 2}}>User name: {auth.user.username}</Typography>
          <Typography variant="h5" sx={{ m: 2}}>Full name: {auth.user.fullname}</Typography>
          <Typography variant="h5" sx={{ m: 2}}>Role: {auth.user.role}</Typography>
          <Typography variant="h5" sx={{ m: 2}}>Email: {auth.user.email}</Typography>
          <Typography variant="h5" sx={{ m: 2}}>Posts: {auth.user.posts?.length}</Typography>
          <Button variant="contained" onClick={() => setEditMode(true)}>Update profile</Button>
        </>
        :
        <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.inputs} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2} className={styles.inputs}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="User Name"
                autoComplete="User name"
                {...register('username')}
                error={!!errors.username}
              />
              <Typography variant="subtitle2" color="error">
                {errors.username?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="fullname"
                label="Fullname"
                autoComplete="Fullname"
                {...register('fullname')}
                error={!!errors.fullname}
              />
              <Typography variant="subtitle2" color="error">
                {errors.fullname?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex'}}>
              <Typography variant="h6">Role: {auth.user.role} // <span className={styles.error}>You can't change your role</span></Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="Email"
                {...register('email')}
                error={!!errors.email}
              />
              <Typography variant="subtitle2" color="error">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} className={styles.updateProfileButtons}>
              <Button
                variant="contained"
                className={styles.button}
                onClick={() => setEditMode(false)}
              >Back</Button>
              <Button
                type="submit"
                className={styles.button}
                variant="contained"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>

      }
    </Card>
  );
});
