import React, { useEffect, useState } from 'react';
import * as api from "../pages/api/posts.js";
import { grey } from '@mui/material/colors';
import styles from '@/styles/post.module.css';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  FormControl,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Avatar,
  AvatarGroup,
  Typography,
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import 'react-datepicker/dist/react-datepicker.css';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

export default function MyRides({ profile }) {
  const username = profile.username;
  const [open, setOpen] = React.useState(false);
  const [posts, setPosts] = useState([]);
  const [joined, setJoined] = useState([]);
  // const [selectedPost, setSelectedPost] = useState(null);

    //open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };


    //close dialog
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = React.useState({
    userName: '',
    creator: '',
    departLoc: '',
    dest: '',
    departDate: '',
    rawDepartTime: null,
    departTime: '',
    flightTime: '',
    flightNumber: '',
    //flightDest: '',
    groupSize: 0
  });

  const editPost = (postID) => {
    api.getPost(postID).then((response) => {
      console.log(response.data.data.rawDepartTime);
      // const rawDepartTime = response.data.data.rawDepartTime
      // const departTimeObj = dayjs(rawDepartTime, 'YYYY/MM/DD hh:mm A').format();
      setFormData({
        departLoc: response.data.data.departLoc,
        dest: response.data.data.dest,
        rawDepartTime: "",
        groupSize: response.data.data.groupSize,
        flightTime: "",
        flightNumber: response.data.data.flightNumber,
      });
    
      handleClickOpen();
    });
  };
  
 const handleUpdatePost = (e, postID) => {
    e.preventDefault();
     //define our form

    let userName = profile.username;
    let creator = `${profile.firstname} ${profile.lastname}`;
    let timeString = formData.departTime;
    let departTime = new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //submit form

      // Extracting the date components
      //format departure date
    const iDateString = formData.departTime;
    const date = new Date(iDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    console.log("WTWDFS")
    // Formatting the date as mm/dd/yyyy
    const formattedDD = `${month}/${day}/${year}`;
    // Update the post using the form data
    const updatedPost = {
      postID: postID,
      userName,
      creator,
      departLoc: formData.departLoc,
      dest: formData.dest,
      departDate: formattedDD,
      rawDepartTime: formData.departTime,
      departTime: departTime,
      timeObject: new Date(formData.departTime),
      flightTime: formData.flightTime,
      flightNumber: formData.flightNumber,
      groupSize: formData.groupSize,
    };

    // Call a function or API to update the post in the database
    // api.updatePost(updatedPost);

    console.log(updatedPost)
    // Call a function or API to save the post to the database
    const id = api.updatePost(updatedPost);

    console.log("KLSJDFKLSJDFKLJSKDLFJSLKJJD")
    const updatedPost2 = {};
    updatedPost2.id = id;
    updatedPost2.data = updatedPost;    

    api.getUserPosts(username).then((newposts) => {
     // Reset the form after saving the post
     setPosts(newposts.posts);
     getPosts();
     userName = '';
     creator = '';
     formData.departLoc = '';
     formData.dest = '';
     formData.departDate = '';
     formData.departTime = '';
     formData.flightTime = '';
     formData.flightNumber = '';
     //formData.flightDest = '';
     formData.groupSize = 0;
   })
   handleClose();

  };

  //handle changes in input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
     // Check if the name includes a dot (.)
    if (name.includes('.')) {
      const [nestedName, subName] = name.split('.');
       setFormData((prevFormData) => ({
        ...prevFormData,
        [nestedName]: {
          ...prevFormData[nestedName],
          [subName]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

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
        <div>
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
                    <CardActions>
                      <Button size="small" onClick={() => {editPost(post.id)}}>Edit Post</Button>
                    </CardActions>
                </Card>
              </Grid>
            ))}
            </Grid>
            </Box>

               {/* defining the dialog */}
    
     <Dialog open={open} onClose={handleClose}>
       <DialogTitle id="alert-dialog-title">
         Edit Post
       </DialogTitle>
       {posts.map((post) => (
       <form onSubmit={(e) => handleUpdatePost(e, post.id)}>
       {/* <form > */}
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             Fill out the following to create your own post.
           </DialogContentText>
           <Grid container spacing={2} mt={0} mb={2}>
           <Grid item xs={6}>
               <TextField
                 fullWidth
                 label="Departure Location"
                 name="departLoc"
                 value={formData.departLoc}
                 onChange={handleInputChange}
                 required
               />
             </Grid>
             <Grid item xs={6}>
               <TextField
                 fullWidth
                 label="Destination"
                 name="dest"
                 value={formData.dest}
                 onChange={handleInputChange}
                 required
               />
             </Grid>
             <Grid item xs={6}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DateTimePicker
                   fullwidth
                   slotProps={{ textField: { fullWidth: true } }}
                   label="Depart Time" value={formData.departTime} 
                   onChange={(date) => handleInputChange({ target: { name: 'departTime', value: date } })}
                   required
                 />
               </LocalizationProvider>
             </Grid>
             <Grid item xs={6}>
               <FormControl fullWidth>
                 <InputLabel id="group-size">Group Size</InputLabel>
                 <Select
                   labelId="group-size"
                   id="group-size-selection"
                   label="Group Size"
                   value={formData.groupSize}
                   onChange={(event) =>
                     handleInputChange({
                       target: { name: 'groupSize', value: event.target.value },
                     })
                   }
                 >
                   <MenuItem value={2}>Two</MenuItem>
                   <MenuItem value={3}>Three</MenuItem>
                   <MenuItem value={4}>Four</MenuItem>
                   <MenuItem value={5}>Five</MenuItem>
                   <MenuItem value={6}>Six</MenuItem>
                 </Select>
               </FormControl>
             </Grid>
             <Grid item xs={6}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                   <TimePicker
                     fullwidth
                     slotProps={{ textField: { fullWidth: true } }}
                     label="Flight Time"
                     name="flightTime"
                     value={formData.flightTime}
                     onChange={(time) => handleInputChange({ target: { name: 'flightTime', value: time } })}
                   />
               </LocalizationProvider>
             </Grid>
             <Grid item xs={6}>
               <TextField
                 fullWidth
                 label="Flight Number"
                 name="flightNumber"
                 value={formData.flightNumber}
                 onChange={handleInputChange}
               />
             </Grid>
           </Grid>
           <DialogActions>
             <Button onClick={handleClose} variant="outlined">Cancel</Button>
             <Button type="submit" variant="contained" autoFocus>Save</Button>
           </DialogActions>
         </DialogContent>
       </form>
         ))}
     </Dialog>
  

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
                      sx={{backgroundColor:'#C65858'}}>
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
      </div>
    ); 
  }
