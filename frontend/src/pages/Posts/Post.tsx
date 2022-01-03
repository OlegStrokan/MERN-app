import React from 'react';
import { Card, Typography } from '@mui/material';
import { PostDto } from '../../types/post.dto';
import { Link } from 'react-router-dom';

interface PostInterface {
  post: PostDto;
}

export const Post: React.FC<PostInterface> = ({ post}) => {

  return (
    <Card sx={{ p: 2, m: 2}}>
      {
        <Link to={{
          pathname: "/posts/" + post._id,
        }}>
        <div>
        <Typography>Content: {post.title}</Typography>
        <Typography>Likes: {post.likesCount}</Typography>
      </div>
        </Link>
      }
    </Card>
  );
};
