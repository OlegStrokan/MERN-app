import React from 'react';
import {  Card, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { PostDto } from '../../types/post.dto';


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
