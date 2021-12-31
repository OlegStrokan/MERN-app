import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { PostDto } from '../../types/post.dto';
import { EditPost } from './EditPost';
import { posts } from '../../mobx/posts';
import { Link } from 'react-router-dom';

interface PostInterface {
  post: PostDto;
}

export const Post: React.FC<PostInterface> = ({ post}) => {

  const [editMode, setEditMode] = React.useState<boolean>(false);
  return (
    <Card sx={{ p: 2, m: 2}}>
      {!editMode ? <>
        <Link to={{
          pathname: "/posts/" + post._id,
        }}>
        <div>
        <Typography>Content: {post.title}</Typography>
        <Typography>Likes: {post.likesCount}</Typography>
      </div>
        </Link>
        <div>
        <Button variant="contained" onClick={() => setEditMode(!editMode)} sx={{ m: 1}}>Update</Button>
        <Button variant="contained" onClick={() => posts.deletePost(post._id as string)} sx={{ m: 1}}>Delete</Button>
        </div>
        </>
        : <EditPost post={post}/>
      }
    </Card>
  );
};
