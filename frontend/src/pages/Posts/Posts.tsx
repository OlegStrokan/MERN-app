import React from 'react';
import { Card, Typography } from '@mui/material';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { posts } from '../../mobx/posts';
import { AddPost } from './AddPost';
import { Post } from './Post';

export const Posts = observer(() => {
  React.useEffect(() => {

  }, [auth.isAuth])

  if (!auth.isAuth) {
    return <Navigate to="/login"/>;
  }

  const [editMode, setEditMode] = React.useState<boolean>(false);

  return (
    <Card sx={{ p: 2, m: 2 }}>
      {auth.user.posts?.length === 0
        ? <Typography variant="h6">This user don't have any posts</Typography>
        : <Typography variant="h6">{auth.user.username}'s posts:
          <AddPost/>
          {posts.posts.length !== 0
            ? <>{posts.posts.map((post) => {
              return <Post editMode={editMode} setEditMode={setEditMode} post={post}/>
            })}</>
            : <div>...Loading</div>
          }
        </Typography>}
    </Card>
  );
});
