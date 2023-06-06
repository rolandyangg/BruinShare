import React, { useEffect, useState } from 'react';
import * as api from "../pages/api/posts.js";
import styles from '@/styles/post.module.css';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Box,
    Button,
    Grid,
    Card,
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
    const [openInfo, setOpenInfo] = React.useState(null);

    //open dialog
    const handleInfoClickOpen = (id) => {
      setOpenInfo(id);
    };

    //close dialog
    const handleInfoClose = () => {
      setOpenInfo(null);
    };

    //getting posts that were created by this user
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

    //get posts upon first render
    useEffect(() => {
        getPosts();
      }, []);
    

    //when user clicks leave group button
    const leaveGroup = (postID) => {
        api.leaveGroup(username, postID).then(() => {
            getPosts();
        })
    }

    //when user decides to delete their post
    const deletePost = (postID) => {
        api.deletePost(postID).then(() => {
            getPosts();
        })
    }
    
    return (
        <div>
        <Box p={4}>
            <h1 className={styles.myrides_heading}>My Posts</h1>
            <Box m={2}>
            <Grid container spacing={4} mt={2} pb={5}>
            {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4} lg={3} variant="outlined">
                <Card sx={{ maxWidth: 1000, boxShadow: 7, borderRadius:'5px' }}>
                  <CardActionArea  onClick={() => {
                        handleInfoClickOpen(post.id)
                      }}>
                  <Grid 
                      container
                      justifyContent="center" 
                      alignItems="center" 
                      p={3}
                      sx={{
                        backgroundColor:
                          post.data.userName === username
                            ? '#DED9E2'
                            : post.data.members !== undefined && post.data.members.includes(username)
                            ? "#fff1a8" // gold  // '#C65858' red
                            : '#d0dfff', // blue //  '#3AE46D', green
                      }}
                      >
                      <Grid sx={{height: '60px'}} item xs={12}>
                        <Typography variant="h5" textAlgin="center" color="text.secondary">
                        {post.data.departLoc}
                        {`  →  `}
                        {post.data.dest}
                        </Typography>
                      </Grid>
                    </Grid>
                    <CardContent>
                      <AvatarGroup sx={{marginTop: '-10px', marginBottom: '10px'}} max={3}>
                        {post.data.userName !== undefined &&
                          <Avatar sx={{backgroundColor: 'lightgrey'}} alt={post.data.userName} src="/static/images/avatar/2.jpg"/>
                        }
                        {post.data.members !== undefined && post.data.members.map((member) => (
                          <Avatar sx={{backgroundColor: 'lightgrey'}} alt={member} src="/static/images/avatar/2.jpg" />
                        ))}
                        {/* <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" /> */}
                      </AvatarGroup>
                      <Typography gutterBottom variant="h5" component="div">
                        Departing <b>{post.data.departDate}</b>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Group Creator: {post.data.creator}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Departure Time: {post.data.departTime} on {post.data.departDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Looking for {post.data.members === undefined ? 2 : post.data.groupSize - post.data.members.length} more members.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                    <CardActions>
                      <Button size="small" onClick={() => {deletePost(post.id)}}>Delete Post</Button>
                      <Button size="small" onClick={() => {
                        handleInfoClickOpen(post.id)
                      }}>Details</Button>
                    </CardActions>
                </Card>
              </Grid>
            ))}
            </Grid>
            </Box>

            <h1 className={styles.myrides_heading}>Joined Groups</h1>
            <Box m={2}>
            <Grid container spacing={4} mt={2} pb={5}>
            {joined.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4} lg={3} variant="outlined">
                <Card sx={{ maxWidth: 1000, boxShadow: 7, borderRadius:'5px' }}>
                  <CardActionArea  onClick={() => {
                        handleInfoClickOpen(post.id)
                      }}>
                  <Grid 
                      container
                      justifyContent="center" 
                      alignItems="center" 
                      p={3}
                      sx={{
                        backgroundColor:
                          post.data.userName === username
                            ? '#DED9E2'
                            : post.data.members !== undefined && post.data.members.includes(username)
                            ? "#fff1a8" // gold  // '#C65858' red
                            : '#d0dfff', // blue //  '#3AE46D', green
                      }}
                      >
                      <Grid sx={{height: '60px'}} item xs={12}>
                        <Typography variant="h5" textAlgin="center" color="text.secondary">
                        {post.data.departLoc}
                        {`  →  `}
                        {post.data.dest}
                        </Typography>
                      </Grid>
                    </Grid>
                    <CardContent>
                    <AvatarGroup sx={{marginTop: '-10px', marginBottom: '10px'}} max={3}>
                        {post.data.userName !== undefined &&
                          <Avatar sx={{backgroundColor: 'lightgrey'}} alt={post.data.userName} src="/static/images/avatar/2.jpg"/>
                        }
                        {post.data.members !== undefined && post.data.members.map((member) => (
                          <Avatar sx={{backgroundColor: 'lightgrey'}} alt={member} src="/static/images/avatar/2.jpg" />
                        ))}
                        {/* <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" /> */}
                      </AvatarGroup>
                      <Typography gutterBottom variant="h5" component="div">
                        Departing <b>{post.data.departDate}</b>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Group Creator: {post.data.creator}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Departure Time: {post.data.departTime} on {post.data.departDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Looking for {post.data.members === undefined ? 2 : post.data.groupSize - post.data.members.length} more members.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                    <CardActions>
                      <Button size="small" onClick={() => {leaveGroup(post.id)}}>Leave Group</Button>
                      <Button size="small" onClick={() => {
                        handleInfoClickOpen(post.id)
                      }}>Details</Button>
                    </CardActions>
                </Card>
              </Grid>
            ))}
            </Grid>
        </Box>
      </Box>

      {joined.map((post) => (
      <Dialog
        open={openInfo === post.id}
        onClose={handleInfoClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
        {post.data.creator}'s Trip Details
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" color="text.secondary">
          {post.data.departLoc} To {post.data.dest}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Departure Time: {post.data.departTime}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Flight Number: {post.data.flightNumber}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Group Size: {post.data.members === undefined ? 2 : post.data.groupSize}, looking for {post.data.members === undefined ? 2 : post.data.groupSize - post.data.members.length} more!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Current members:
        </Typography>
        {post.data.members !== undefined && post.data.members.map((member) => (
          <Typography variant="h6" color="text.secondary">
              <li>{member}</li>
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleInfoClose}>Close</Button>
      </DialogActions>
      </Dialog>
      ))}

      {posts.map((post) => (
      <Dialog
        open={openInfo === post.id}
        onClose={handleInfoClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
        {post.data.creator}'s Trip Details
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" color="text.secondary">
          {post.data.departLoc} To {post.data.dest}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Departure Time: {post.data.departTime}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Flight Number: {post.data.flightNumber}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Group Size: {post.data.members === undefined ? 2 : post.data.groupSize}, looking for {post.data.members === undefined ? 2 : post.data.groupSize - post.data.members.length} more!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Current members:
        </Typography>
        {post.data.members !== undefined && post.data.members.map((member) => (
          <Typography variant="h6" color="text.secondary">
              <li>{member}</li>
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleInfoClose}>Close</Button>
      </DialogActions>
      </Dialog>
      ))}
      </div>
    )
}
