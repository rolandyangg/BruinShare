import React, { useEffect, useState } from 'react';
import * as api from "../pages/api/posts.js";
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

import LocationAutocomplete from '../components/LocationAutocomplete.js'

export default function MyRides({ profile }) {
  const username = profile.username;
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = useState(null);
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
  
    // Formatting the date as mm/dd/yyyy
    const formattedDD = `${month}/${day}/${year}`;
    // Update the post using the form data
    const updatedPost = {
      postID: postID,
      userName,
      creator,
      // departLoc: formData.departLoc,
      departLoc: e.target[0].value.split(",")[0],
      // dest: formData.dest,
      dest: e.target[4].value.split(",")[0],
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

    // Call a function or API to save the post to the database
    const id = api.updatePost(updatedPost);

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
            <h1 className={styles.myrides_heading} style={{ textAlign: 'left' }}>My Posts</h1>
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
                            ? '#fff1a8'
                            : post.data.members !== undefined && post.data.members.includes(username)
                            ? "#edf5fa" // gold  // '#C65858' red
                            : '#4ea5f0', // blue //  '#3AE46D', green
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
                      <Grid container mb={2}>
                      <AvatarGroup sx={{float: 'left'}} max={3}>
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
                      </Grid>
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
                  <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                      <Button size="small" onClick={() => { handleInfoClickOpen(post.id) }}>Details</Button>
                      <Button size="small" onClick={() => { deletePost(post.id) }}>Delete</Button>
                      <Button size="small" onClick={() => { editPost(post.id) }}>Edit</Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

     {/* defining the dialog */}
     
  
            <h1 className={styles.myrides_heading} style={{ textAlign: 'left' }}>Joined Groups</h1>
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
                            ? '#fff1a8'
                            : post.data.members !== undefined && post.data.members.includes(username)
                            ? "#e1f2fc" // gold  // '#C65858' red
                            : '#95c5ed', // blue //  '#3AE46D', green
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
                      <Grid container mb={2}>
                      <AvatarGroup sx={{float: 'left'}} max={3}>
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
                      </Grid>
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
                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                        <Button size="small" onClick={() => {leaveGroup(post.id)}}>Leave Group</Button>
                        <Button size="small" onClick={() => {
                          handleInfoClickOpen(post.id)
                        }}>Details</Button>
                      </div>
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
      <>
        {/* the post details popup */}
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

      {/* the edit form popup */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center', fontSize: '2.5rem', paddingTop: '30px' }}>
        Edit Post
      </DialogTitle>
          <form onSubmit={(e) => handleUpdatePost(e, post.id)}>
            <DialogContent>
              <Grid container spacing={2} mb={2}>
              <Grid item xs={6} mt={2}>
                  <LocationAutocomplete
                    label="Departure Location"
                    name="departLoc"
                  />
                  {/* <TextField
                    fullWidth
                    label="Departure Location"
                    name="departLoc"
                    value={formData.departLoc}
                    onChange={handleInputChange}
                    required
                  /> */}
                </Grid>
                <Grid item xs={6} mt={2}>
                  <LocationAutocomplete
                    label="Destination"
                    name="dest"
                  />
                  {/* <TextField
                    fullWidth
                    label="Destination"
                    name="dest"
                    value={formData.dest}
                    onChange={handleInputChange}
                    required
                  /> */}
                </Grid>
                <Grid item xs={6} mt={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      fullwidth
                      slotProps={{ textField: { fullWidth: true, error: false } }}
                      label="Depart Time" value={formData.departTime} 
                      onChange={(date) => handleInputChange({ target: { name: 'departTime', value: date } })}
                      required
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} mt={2}>
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
                <Grid item xs={6} mt={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        fullwidth
                        slotProps={{ textField: { fullWidth: true, error: false } }}
                        label="Flight Time"
                        name="flightTime"
                        value={formData.flightTime}
                        onChange={(time) => handleInputChange({ target: { name: 'flightTime', value: time } })}
                      />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} mt={2}>
                  <TextField
                    fullWidth
                    label="Flight Number"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', marginRight: '20px', marginBottom: '40px' }}>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained" autoFocus>Save</Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
      ))}
    </div>
  ); 
}
