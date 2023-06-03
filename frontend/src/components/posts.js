import React, { useEffect, useState } from 'react';
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
  InputAdornment,
  InputLabel,
  Card,
  Divider,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  NumberField,
  CardActionArea,
  Collapse,
  Avatar,
  AvatarGroup,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import { grey } from '@mui/material/colors';


import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import styles from '@/styles/post.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import * as api from "../pages/api/posts.js";

export default function CustomizedDialogs({ profile }) {
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.getPosts().then((response) => {
      if(response !== null)
        setPosts(response.data);
    });
  }, []);


  //define our form
  const [formData, setFormData] = React.useState({
    userName: '',
    creator: '',
    departLoc: '',
    dest: '',
    departDate: '',
    departTime: '',
    flightTime: '',
    flightNumber: '',
    //flightDest: '',
    groupSize: 0
  });

  // define our filter
  const [filterForm, setFilterForm] = React.useState({
    startLocation: '',
    endLocation: '',
    startTimeRange: '',
    endTimeRange: '',
    groupSizeMin: '',
    groupSizeMax: '',
  })

  //open dialog
  const handleInfoClickOpen = () => {
    setOpenInfo(true);
  };

  //close dialog
  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  //open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //close dialog
  const handleClose = () => {
    setOpen(false);
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

  //handle changes in input
  const handleFilterInputChange = (event) => {
    const { name, value } = event.target;
  
    // Check if the name includes a dot (.)
    if (name.includes('.')) {
      const [nestedName, subName] = name.split('.');
  
      setFilterForm((prevFormData) => ({
        ...prevFormData,
        [nestedName]: {
          ...prevFormData[nestedName],
          [subName]: value,
        },
      }));
    } else {
      setFilterForm((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // sort posts
  const sortPosts = (filter) => {
    console.log("Sorting...");
    console.log(filter);
    let sortedPosts = [...posts] // We have to make a copy because we can't directly mutate posts
    // console.log(new Date(sortedPosts[0].data.timeObject.seconds));
    if (filter == "Time/Newest") {
      sortedPosts.sort((a, b) => a.data.timeObject.seconds - b.data.timeObject.seconds); 
    } else if (filter == "Time/Oldest") {
      sortedPosts.sort((a, b) => b.data.timeObject.seconds - a.data.timeObject.seconds);
    }
    setPosts(sortedPosts);
  }


  let userName = profile.username;
  let creator = `${profile.firstname} ${profile.lastname}`;
  let timeString = formData.departTime;
  let departTime = new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  //submit form
  const handleCreatePost = (e) => {
    e.preventDefault();

    //format departure date
    const iDateString = formData.departTime;
    const date = new Date(iDateString);

    // Extracting the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Formatting the date as mm/dd/yyyy
    const formattedDD = `${month}/${day}/${year}`;

    // if (duplicate.length !== 0) {
    //   alert("your username is taken! pick another one!")
    // }

    // Create the post using the form data
    const newPost = {
        userName: userName,
        creator: creator,
        departLoc: formData.departLoc,
        dest: formData.dest,
        departDate: formattedDD,
        departTime: departTime,
        timeObject: new Date(formData.departTime),
        flightTime: formData.flightTime,
        flightNumber: formData.flightNumber,
        flightDest: formData.flightDest,
        groupSize: formData.groupSize,
    };

    // Call a function or API to save the post to the database
    const id = api.createPost(newPost);

    const newpost2 = {};
    newpost2.id = id;
    newpost2.data = newPost;

    const tempPosts = [...posts, newpost2]
    setPosts(tempPosts);

    api.getPosts().then(() => {
      // Reset the form after saving the post
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

      handleClose();
    })
  };

  // Filter form submit
  const handleFilterFormSubmit = (e) => {
    e.preventDefault();

    // console.log(filterForm)

    const filter = {
      startLocation: filterForm.startLocation,
      endLocation: filterForm.endLocation,
      startTimeRange: filterForm.startTimeRange,
      endTimeRange: filterForm.endTimeRange,
      groupSizeMin: filterForm.groupSizeMin,
      groupSizeMax: filterForm.groupSizeMax,
    }

    const res = api.getFilteredPosts(filter).then((response) => {
      if (response !== null) {
        console.log("successfully received");
        // console.log(response);
        setPosts(response);
        console.log(posts);
      }
    })    
  };

  const username = profile.username;
  const joinGroup = (postID, creator) => {
    if(creator !== null && creator !== profile.username){
      console.log(creator);
      api.joinGroup(username, postID).then(() => {
        api.getPosts().then((response) => {
          if(response !== null)
            setPosts(response.data);
        });
      });
    }
    else{
      alert("cannot join this group, you created it!")
    }
  }

  return (
    <div>
      {/* sort by and create post */}
      <Box m={2}>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="sort-posts">Sort By</InputLabel>
              <Select labelId="sort-posts" fullWidth variant="outlined" size="large" label="sort-posts"
              onChange={(event) => { sortPosts(event.target.value); }
                // handleInputChange({
                //   target: { name: 'groupSize', value: event.target.value },
                // })
              }>
                <MenuItem value={'Time/Newest'}>Date/Time (Newest to Oldest)</MenuItem>
                <MenuItem value={'Time/Oldest'}>Date/Time (Oldest to Newest)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" size="large" onClick={handleClickOpen} startIcon={<AddIcon />} style={{ height: 55 }}>Create Post</Button>
          </Grid>
        </Grid>
      </Box>

      <Divider/>

      {/* filter/search bar */}
      <Box m={2}>
      <form onSubmit={handleFilterFormSubmit}>
        <Grid container spacing={2} mt={4}>
          
          <Grid item xs={1.5}>
            <TextField
              fullWidth
              id="outlined-start-adornment"
              label="Start Location"
              name="startLocation"
              value={filterForm.startLocation}
              onChange={handleFilterInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            >Search</TextField>
          </Grid>
          <Grid item xs={1.5}>
            <TextField
              fullWidth
              id="outlined-start-adornment"
              label="End Location"
              name="endLocation"
              value={filterForm.endLocation}
              onChange={handleFilterInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            >Search</TextField>
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                fullwidth
                slotProps={{ textField: { fullWidth: true } }} 
                label="Start Date Range" value={formData.departTime}  
                onChange={(date) => handleFilterInputChange({ target: { name: 'startTimeRange', value: date } })}
                required
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                fullwidth
                slotProps={{ textField: { fullWidth: true } }} 
                label="End Date Range" value={formData.departTime}  
                onChange={(date) => handleFilterInputChange({ target: { name: 'endTimeRange', value: date } })}
                required
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1.5}>
            <TextField
              fullWidth
              type="number"
              id="outlined-start-adornment"
              label="Group Size Minimum"
              name="groupSizeMin"
              value={filterForm.groupSizeMin}
              onChange={handleFilterInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            >Group Size Minimimum</TextField>
          </Grid>
          <Grid item xs={1.5}>
            <TextField
              fullWidth
              type="number"
              id="outlined-start-adornment"
              label="Group Size Maximum"
              name="groupSizeMax"
              value={filterForm.groupSizeMax}
              onChange={handleFilterInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            >Group Size Maximum</TextField>
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth type="submit" variant="contained" size="large" startIcon={<SearchIcon />} style={{ height: 55 }}>Search</Button>
          </Grid>
          
        </Grid>
        </form>
      </Box>

      <Divider/>

      {/* defining the dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Create Post
        </DialogTitle>
        <form onSubmit={handleCreatePost}>
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
              <Button type="submit" variant="contained" autoFocus>Submit</Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>

      {/* display posts */}
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
                        padding="0"
                        component="img"
                        alt="title"
                        height="50"
                        image="https://images.unsplash.com/photo-1631153127293-8588327c515c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" />
                    </Grid>
                    <CardContent
                      sx={{
                        backgroundColor:
                          post.data.userName === username
                            ? '#DED9E2'
                            : post.data.members !== undefined && post.data.members.includes(username)
                            ? "#FFD100" // gold  // '#C65858' red
                            : '#3595de', // blue //  '#3AE46D', green
                      }}
                    >
                      <AvatarGroup max={3}>
                        {/* TODO: MAP EACH AVATAR TO EACH MEMBER IN THE GROUP */}
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                      </AvatarGroup>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.data.departDate}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
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
                  {post.data.userName === username && 
                    <CardActions>
                      You are the group creator.
                    </CardActions>
                  }
                  {post.data.members !== undefined && post.data.members.includes(username) && 
                    <CardActions>
                      You have joined this group.
                    </CardActions>
                  }
                  {post.data.members !== undefined && (post.data.members).length === post.data.groupSize && 
                    <CardActions>
                      Maximum # of people reached.
                    </CardActions>
                  }
                  {(post.data.members === undefined || !post.data.members.includes(username) && post.data.members.length !== post.data.groupSize) && post.data.userName !== username  && 
                    <CardActions>
                    <Button size="small" onClick={handleInfoClickOpen}>Details</Button>
                    <Button size="small" onClick={() => {joinGroup(post.id, post.data.userName)}}>Join</Button>
                  </CardActions>
                  }
                </Card>
              </Grid>
            ))}
          </Grid>
      </Box>
      {/* popup for details */}
      <Dialog
        open={openInfo}
        onClose={handleInfoClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Creator's trip to Destination from Departure Location
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Other Group Members
            clickable avatars
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInfoClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

