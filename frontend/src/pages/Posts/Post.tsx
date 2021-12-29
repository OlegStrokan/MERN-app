import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { PostDto } from '../../types/post.dto';
import { EditPost } from './EditPost';
import { posts } from '../../mobx/posts';

interface PostInterface {
  editMode: boolean;
  setEditMode: (state: boolean) => void;
  post: PostDto;
}

export const Post: React.FC<PostInterface> = ({ editMode , setEditMode, post}) => {
  return (
    <Card sx={{ p: 2, m: 2}}>
      {editMode ? <>
        <div>
        <Typography>Content: {post.content}</Typography>
        <Typography>Likes: {post.likesCount}</Typography>
      </div>
        <div>
        <Button onClick={() => setEditMode(!editMode)}>Update</Button>
        <Button onClick={() => posts.deletePost(post._id as string)}>Delete</Button>
        </div>
        </>
        : <EditPost/>
      }
    </Card>
  );
};
