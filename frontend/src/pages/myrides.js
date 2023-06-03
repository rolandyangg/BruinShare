import React, { useEffect, useState } from 'react';
import * as api from "../pages/api/posts.js";
import { grey } from '@mui/material/colors';
import styles from '@/styles/post.module.css';
import {
    Box,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CardActionArea,
    Avatar,
    AvatarGroup,
    Typography,
  } from '@mui/material';

export default function MyRides({ profile }) {
    const username = profile.username;
    const [posts, setPosts] = useState([]);
    const [joined, setJoined] = useState([]);

    const getPosts = () => {
        api.getUserPosts(username).then((response) => {
            if(response){
                console.log(response);
                const {posts, joined} = response;
                setPosts(posts);
                setJoined(joined);
            }
        });
    }

    useEffect(() => {
        getPosts();
      }, []);
    

    const leaveGroup = (postID) => {
        api.leaveGroup(username, postID).then(() => {
            getPosts();
        })
    }

    const deletePost = (postID) => {
        api.deletePost(postID).then(() => {
            getPosts();
        })
    }
    
    return (
        <Box p={4}>
            <h1>My Posts</h1>
            <Box m={2}>
            <Grid container spacing={4} mt={2} pb={5}>
            {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4} lg={3} variant="outlined">
                <Card sx={{ maxWidth: 1000, boxShadow: 7, borderRadius:'5px' }}>
                  <CardActionArea>
                    <Grid item xs display="flex" justifyContent="center" alignItems="center" sx={{ backgroundColor: grey[200] }} p={3}>
                      <CardMedia
                        center="true"
                        style={{ borderRadius: '50%', height: '30vh', width: '30vh'}}
                        component="img"
                        alt="title"
                        height="140"
                        image="https://images.unsplash.com/photo-1631153127293-8588327c515c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" />
                    </Grid>
                    <CardContent
                      sx={{backgroundColor:'#DED9E2'}}
                    >
                      <AvatarGroup max={3}>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                      </AvatarGroup>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.data.departDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Group Creator: {post.data.creator}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Time: {post.data.departTime}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Location: {post.data.departLoc}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Destination: {post.data.dest}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                    <CardActions>
                      <Button size="small" onClick={() => {deletePost(post.id)}}>Delete Post</Button>
                    </CardActions>
                </Card>
              </Grid>
            ))}
            </Grid>
            </Box>

            <h1>Joined Groups</h1>
            <Box m={2}>
            <Grid container spacing={4} mt={2} pb={5}>
            {joined.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4} lg={3} variant="outlined">
                <Card sx={{ maxWidth: 1000, boxShadow: 7, borderRadius:'5px' }}>
                  <CardActionArea>
                    <Grid item xs display="flex" justifyContent="center" alignItems="center" sx={{ backgroundColor: grey[200] }} p={3}>
                      <CardMedia
                        center="true"
                        style={{ borderRadius: '50%', height: '30vh', width: '30vh'}}
                        component="img"
                        alt="title"
                        height="140"
                        image="https://images.unsplash.com/photo-1631153127293-8588327c515c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" />
                    </Grid>
                    <CardContent
                      sx={{backgroundColor:'#FFD100'}}>
                      <AvatarGroup max={3}>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                      </AvatarGroup>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.data.departDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Group Creator: {post.data.creator}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Time: {post.data.departTime}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Location: {post.data.departLoc}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Destination: {post.data.dest}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                    <CardActions>
                      <Button size="small" onClick={() => {leaveGroup(post.id)}}>Leave Group</Button>
                    </CardActions>
                </Card>
              </Grid>
            ))}
            </Grid>
        </Box>
      </Box>
    )
}
