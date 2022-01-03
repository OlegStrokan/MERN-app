import React from 'react';
import { Card, Typography } from '@mui/material';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AddPost } from './AddPost';
import { Post } from './Post';
import { postsState } from '../../mobx/posts';

export const Posts: React.FC = observer(() => {

  React.useEffect(() => {
    postsState.getPosts();
  }, [auth.isAuth])

  if (!auth.isAuth) {
    return <Navigate to="/login"/>;
  }


  return (
    <Card sx={{ p: 2, m: 2 }}>
      <AddPost/>
      {auth.user.posts?.length === 0
        ? <>
          <Typography variant="h6">This user don't have any posts</Typography>
        </>
        : <Typography variant="h6">{auth.user.username}'s posts:
          {postsState.posts.map((post) => {
            return <Post post={post}/>
          })}
        </Typography>}
    </Card>
  );
});
