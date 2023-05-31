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
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  AvatarGroup,
  IconButton,
  Typography,
  Paper
} from '@mui/material';


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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.getPosts().then((response) => {
      setPosts(response.data);
    });
  }, []);

  console.log(posts);


  //define our form
  const [formData, setFormData] = React.useState({
    creator: '',
    departLoc: '',
    dest: '',
    departDate: '',
    departTime: '',
    flightTime: '',
    flightNumber: '',
    flightDest: '',
    groupSize: 0
  });

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  let creator = `${profile.firstname} ${profile.lastname}`;
  let timeString = formData.departTime;
  let departTime = new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  //submit form
  const handleCreatePost = (e) => {
    e.preventDefault();

    //format departure date
    const iDateString = formData.departDate;
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
      creator: creator,
      departLoc: formData.departLoc,
      dest: formData.dest,
      departDate: formattedDD,
      departTime: departTime,
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

    // Reset the form after saving the post
    creator = '';
    formData.departLoc = '';
    formData.dest = '';
    formData.departDate = '';
    formData.departTime = '';
    formData.flightTime = '';
    formData.flightNumber = '';
    formData.flightDest = '';
    formData.groupSize = 0;

    handleClose();
  };


  return (
    <div>
      <Box m={2}>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id="outlined-start-adornment"
              label="Search"
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              }}
            >Search</TextField>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="sort-posts">Sort</InputLabel>
              <Select labelId="sort-posts" fullWidth variant="outlined" size="large" label="sort-posts">
                <MenuItem value={10}>Date</MenuItem>
                <MenuItem value={20}>Distance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth variant="contained" size="large" onClick={handleClickOpen} startIcon={<AddIcon />} style={{ height: 55 }}>Post</Button>
          </Grid>
        </Grid>
      </Box>

      {/* defining the dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Create Post
        </DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Fill out the following to create your own post.
            </DialogContentText>
            <Grid container spacing={2} mt={0}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Destination"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker slotProps={{ textField: { fullWidth: true } }} label="Depart Time" required/>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="group-size">Group Size</InputLabel>
                  <Select
                    labelId="group-size"
                    id="group-size-selection"
                    label="Group Size"
                  >
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Flight Name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Flight Destination"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
            <Button onClick={handleClose} variant="contained" autoFocus> Submit</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Box m={2}>
        <Grid container spacing={2} mt={2}>
          {posts.map((post) => (
              <Grid item xs={6} sm={4} md={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="title"
                    height="140"
                    image="https://images.unsplash.com/photo-1631153127293-8588327c515c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
                  />
                  <CardContent>
                  <AvatarGroup max={4}>
                    <Avatar alt={post.data.creator} src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                  </AvatarGroup>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.data.departDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Departing at <strong>{post.data.departTime}</strong> from <strong>{post.data.departLoc}</strong> to <strong>{post.data.dest}</strong>.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">Join</Button>
                    <Button size="small" variant="outlined">Details</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
      </Box>

    </div>
  );
}
