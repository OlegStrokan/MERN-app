import React from 'react';
import { Card, Typography } from '@mui/material';
import { auth } from '../../mobx/auth';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AddPost } from './AddPost';
import { Post } from './Post';
import { usersState } from '../../mobx/users';
import { PostDto } from '../../types/post.dto';

export const Posts: React.FC = observer(() => {
  const [posts, setPosts] = React.useState<PostDto[] | null>(null);

  React.useEffect(() => {
    // @ts-ignore
    setUsers(usersState.getUsers());
  }, [auth.isAuth])

  if  (!auth.isAuth) {
    return <Navigate to="/login"/>;
  }

  if (!posts) {
    return <div>...Loading</div>
  }

  return (
    <Card sx={{ p: 2, m: 2 }}>
      <AddPost />
      {auth.user.posts?.length === 0
        ? <>
          <Typography variant="h6">This user don't have any posts</Typography>
        </>
        : <Typography variant="h6">{auth.user.username}'s posts:
          {posts.map((post) => {
              return <Post post={post}/>
            })}
        </Typography>}
    </Card>
  );
});
