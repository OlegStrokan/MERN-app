import React from 'react';
import { auth } from '../../mobx/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from '../Login/Login.module.css';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { postsState } from '../../mobx/posts';
import { validationSchema } from '../../utils/validators/post';
import { observer } from 'mobx-react-lite';

export const AddPost: React.FC = observer(() => {
  const onSubmit = (event: any) => {
    postsState.createPosts(event.content, event.title, auth.user)
  };
  const {
    register, control, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">Add new post</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.inputs} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2} className={styles.inputs}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="Title"
              autoComplete="Title"
              {...register('title')}
              error={!!errors.title}
            />
            <Typography variant="subtitle2" color="error">
              {errors.title?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="content"
              label="Content"
              autoComplete="Content"
              {...register('content')}
              error={!!errors.content}
            />
            <Typography variant="subtitle2" color="error">
              {errors.content?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, p: 2 }}
            >
              Add post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});
