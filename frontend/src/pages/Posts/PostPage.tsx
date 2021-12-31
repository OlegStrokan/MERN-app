import React from 'react';
import {  Card, IconButton, Typography } from '@mui/material';
import { posts } from '../../mobx/posts';
import { useParams } from 'react-router-dom';
import { PostDto } from '../../types/post.dto';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { auth } from '../../mobx/auth';

export const PostPage: React.FC = () => {
debugger;
  const [post, setPost] = React.useState<PostDto | null>(null);


  const { id } = useParams()
  React.useEffect(() => {
    // @ts-ignore
    return setPost(posts.showPost(id as string));
  },[])

  if (!post) {
    return <div>...Loading</div>
  }



  return <Card>
    <Typography>{post?.title}</Typography>
    <Typography>{post?.content}</Typography>
    <Typography>{post?.likesCount}</Typography>
  </Card>
};
