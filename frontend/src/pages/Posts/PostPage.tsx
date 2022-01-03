import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { postsState } from '../../mobx/posts';
import { EditPost } from './EditPost';
import { observer } from 'mobx-react-lite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const PostPage: React.FC = observer(() => {
  const [editMode, setEditMode] = React.useState<boolean>(false);


  const { id } = useParams()
  React.useEffect(() => {
     postsState.showPost(id as string);
  },[])

  if (!postsState.currentPost) {
    return <div>...Loading</div>
  }



  return <Card>
    {!editMode ?
      <>
    <Typography>{postsState.currentPost?.title}</Typography>
    <Typography>{postsState.currentPost?.content}</Typography>
    <Typography sx={{display: 'flex'}}><FavoriteBorderIcon/>{postsState.currentPost?.likesCount}</Typography>
    <Button variant="contained" onClick={() => setEditMode(!editMode)} sx={{ m: 1}}>Update</Button>
    <Button variant="contained" onClick={() => postsState.deletePost(postsState.currentPost?._id as string)} sx={{ m: 1}}>Delete</Button>
      </>
    : <EditPost post={postsState.currentPost} setEditMode={setEditMode} editMode={editMode} />}
  </Card>
});
