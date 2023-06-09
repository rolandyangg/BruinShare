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
 ListItemIcon, 
 Icon,
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



import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// import styles from '@/styles/post.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import * as api from "./api/posts.js";
import * as userApi from "./api/api.js";

import LocationAutocomplete from '../components/LocationAutocomplete.js'
import Autocomplete from "react-google-autocomplete";
import styles from '../styles/post.module.css'

import PersonIcon from '@mui/icons-material/Person';

export default function CustomizedDialogs({ profile }) {
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(null);
  const [posts, setPosts] = useState([]);
  const [profilePictures, setProfilePictures] = useState({});


 useEffect(() => {
   api.getPosts().then((response) => {
     if (response !== null) {
      // Set the posts
      setPosts(response.data);

      // Collect all the usernames mentioned in all the posts
      let usernames = [];
      for (let post of response.data) {
        post = post.data;
        if (!usernames.includes(post.userName.username)){
          usernames.push(post.userName.username);
          if (Array.isArray(post.members)) {
            for (let member of post.members) {
              if (!usernames.includes(member))
                usernames.push(member);
            }
          }
        }
      }

      console.log(usernames);

      // Create a dictionary of all the relevant user images to render them
      // (We do this because it is more space efficient and reduces amount of API calls made)
      let newProfilePics = {};
      userApi.getUsers().then((userRes) => {
        for (let user of userRes.data) {
          if (usernames.includes(user.data.username))
            newProfilePics[user.data.username] = user.data.profilePicture;
        }
        setProfilePictures(newProfilePics);
      })
     }
   });
 }, []);




 //define our form
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
  const handleInfoClickOpen = (id) => {
    setOpenInfo(id);
  };

  //close dialog
  const handleInfoClose = () => {
    setOpenInfo(null);
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




 let userName = profile;
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

    // Create the post using the form data
    const newPost = {
        userName: userName,
        creator: creator,
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
     userName = {};
     creator = '';
     formData.departLoc = '';
     formData.dest = '';
     formData.departDate = '';
     formData.rawDepartTime = null;
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
  // when a user clicks join group
  const joinGroup = (postID, creator) => {
    if(creator !== null && creator !== profile.username){
      console.log(creator);
      api.joinGroup(profile.username, postID).then(() => {
        //after joining group, get all posts again to reflect the change on the bulletin
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
    <div >
      <Box sx={{textAlign: 'center'}} m={2} mt={4}>
        <h1 className={styles.posting_heading}>Current Postings</h1>
          <Grid className={styles.create_button} item xs={1.71}>
            <Button   
              style={{
                color: 'white',
                height: 55
              }}
              onClick={handleClickOpen} fullWidth variant="contained" size="large" startIcon={<AddIcon />} >Create Post</Button>
          </Grid>
      </Box>

      {/* filter/search bar */}
      <Box sx={{textAlign: "center"}} m={4}>
      <form onSubmit={handleFilterFormSubmit}>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={1.71}>
            <TextField
              fullWidth
              id="outlined-start-adornment"
              label="Leaving From"
              name="startLocation"
              value={filterForm.startLocation}
              onChange={handleFilterInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            >Search</TextField>
          </Grid>
          <Grid item xs={1.71}>
            <TextField
              fullWidth
              id="outlined-start-adornment"
              label="Going To"
              name="endLocation"
              value={filterForm.endLocation}
              onChange={handleFilterInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            >Search</TextField>
          </Grid>
          <Grid item xs={1.71}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                fullWidth
                slotProps={{ textField: { fullWidth: true, error: false } }} 
                label="Start Date Range" value={formData.departTime}  
                onChange={(date) => handleFilterInputChange({ target: { name: 'startTimeRange', value: date } })}
                required
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1.71}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                fullWidth
                slotProps={{ textField: { fullWidth: true, error: false} }} 
                label="End Date Range" value={formData.departTime}  
                onChange={(date) => handleFilterInputChange({ target: { name: 'endTimeRange', value: date } })}
                required
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1.71}>
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
          <Grid item xs={1.71}>
            <FormControl sx={{width: '100%', textAlign: 'center'}}>
                <InputLabel id="sort-posts">Sort By</InputLabel>
                <Select labelId="sort-posts" fullWidth variant="outlined" size="large" label="sort-posts"
                onChange={(event) => { sortPosts(event.target.value); }
                }>
                  <MenuItem value={'Time/Newest'}>Date/Time (Newest to Oldest)</MenuItem>
                  <MenuItem value={'Time/Oldest'}>Date/Time (Oldest to Newest)</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={1.71}>
            <Button style={{
                color: 'white',
                height: 55
              }}
              fullWidth type="submit" variant="contained" size="large" startIcon={<SearchIcon />}>Search</Button>
          </Grid>
        </Grid>
        </form>
      </Box>

      <Divider/>

      {/* defining the dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
  <DialogTitle id="alert-dialog-title" textAlign='center' mt={3} style={{ fontSize: '2.5rem' }}>
    Create Post
  </DialogTitle>
  <form onSubmit={handleCreatePost}>
    <DialogContent>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6} mt={2}>
          <LocationAutocomplete
            label="Departure Location"
            name="departLoc"
          />
        </Grid>
        <Grid item xs={6} mt={2}>
          <LocationAutocomplete
            label="Destination"
            name="dest"
          />
        </Grid>
        <Grid item xs={6} mt={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
              fullwidth
              slotProps={{ textField: { fullWidth: true, error: false } }} 
              label="Depart Time"
              value={formData.departTime}
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
        <Button type="submit" variant="contained" autoFocus>Submit</Button>
    </DialogActions>
  </form>
</Dialog>


      {/* sort by and create post + display posts */}
      <Box m={4} >
        <Grid container spacing={4} mt={2} pb={5}>
          {posts.filter(post => post.data.members === undefined || (post.data.members).length !== post.data.groupSize).map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4} lg={3} variant="outlined">
                <Card sx={{ maxWidth: 1000, boxShadow: 7, borderRadius:'5px' }}>
                  <CardActionArea onClick={() => {handleInfoClickOpen(post.id)}}>
                    <Grid 
                      container
                      justifyContent="center" 
                      alignItems="center" 
                      p={3}
                      sx={{
                        backgroundColor:
                          post.data.userName.username === username
                            ? '#fff1a8'
                            : post.data.members !== undefined && post.data.members.includes(username)
                            ? "#e1f2fc" // gold  // '#C65858' red
                            : '#95c5ed', // blue //  '#3AE46D', green
                      }}
                      >

                      <Grid sx={{height: '60px'}} item xs={12}>
                      {post.data.members !== undefined && (post.data.members).length === post.data.groupSize ? (
                       <Typography variant="h5" color="text.secondary" style={{ fontSize: "1.9rem", align: "center", textAlign: "center", paddingTop: "10px"}}>
                       FULL
                     </Typography>
                     
                      )
                      :
                       (
                    
                       <Typography variant="h5" textAlgin="center" centercolor="text.secondary" style={{ fontSize: "1.5rem", align: "center"}}>
                       {post.data.departLoc}
                       {`  →  `}
                       {post.data.dest}
                     </Typography>

                       ) 
                      }
                      </Grid>
                    </Grid>
                    <CardContent>
                      <Grid container mb={2}>
                      <AvatarGroup sx={{float: 'left'}} max={3}>
                        {post.data.userName.username !== undefined &&
                          <Avatar sx={{backgroundColor: 'lightgrey'}} alt={post.data.userName.username} src={profilePictures[post.data.userName.username]}/>
                        }
                        {post.data.members !== undefined && post.data.members.map((member) => (
                          <Avatar sx={{backgroundColor: 'lightgrey'}} alt={member} src={profilePictures[member]} />
                        ))}
                      </AvatarGroup>
                      </Grid>
                      
                      <Typography gutterBottom variant="h5" component="div">
                        Departing <b>{post.data.departDate}</b>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Departure Time: {post.data.departTime} 
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Looking for {post.data.members === undefined ? post.data.groupSize : post.data.groupSize - post.data.members.length - 1} more!
                      </Typography>
                      
                    </CardContent>
                  </CardActionArea>
                  {post.data.userName.username === username && 
                    <CardActions style={{ justifyContent: 'flex-end' }}>
                      <Button size="small" onClick={() => {
                        handleInfoClickOpen(post.id)
                      }}>Details</Button>
                      <Typography styles={{ paddingRight: '20px'}} variant="body2" color="text.secondary" >
                        YOUR POST
                      </Typography>
                    </CardActions>
                  }
                  {post.data.members !== undefined && post.data.members.includes(username) && 
                    <CardActions style={{ justifyContent: 'flex-end', paddingRight: '20px' }}>
                      <Button size="small" onClick={() => handleInfoClickOpen(post.id)}>Details</Button>
                      <Typography variant="body2" color="text.secondary">JOINED</Typography>
                    </CardActions>
                  }
                  {(post.data.members === undefined || !post.data.members.includes(username) && post.data.members.length !== post.data.groupSize) && post.data.userName.username !== username  && 
                  <CardActions style={{ justifyContent: 'flex-end' }} >
                    <Button size="small" onClick={() => handleInfoClickOpen(post.id)}>Details</Button>
                    <Button size="small" styles={{ paddingRight: '10px'}} onClick={() => {joinGroup(post.id, post.data.userName.username)}}>Join</Button>
                  </CardActions>
                  }
                </Card>
              </Grid>
            ))}
          </Grid>
      </Box>
      
      {posts.filter(post => post.data.members === undefined || (post.data.members).length !== post.data.groupSize).map((post) => (
        <Dialog
          open={openInfo === post.id}
          onClose={handleInfoClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{ style: { width: '80vw', height: '80vh', borderRadius: '10px', } }}
          key={post.id}
        >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center', fontSize: '2.3rem', paddingTop: '28px' }}>
          Trip Details
        </DialogTitle>
        <DialogContent>
        <Typography variant="h5" color="text.primary" sx={{ mb: 0.6, pl: 2 }}>
            Creator Information:
          </Typography>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: '0.5rem', paddingLeft: '15px' }}>
            <Avatar sx={{width: 30, height: 30, backgroundColor: 'lightgrey'}} alt={profilePictures[post.data.userName.username]} src={profilePictures[post.data.userName.username]} />
            <Typography display="flex" variant="h6" alignItems='center' color="text.secondary" key={post.data.userName.username} sx={{ mb: 0.6, pl: 2 }}>
            {post.data.userName.username}
            </Typography>
          </ListItemIcon>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 0.6, pl: 2 }}>
          Creator Phone #: {post.data.userName.phone ? post.data.userName.phone : 'Phone number not provided'}
        </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1.2, pl: 2 }}>
            Creator Email: {post.data.userName.email}
          </Typography>

          <Typography variant="h5" color="text.primary" sx={{ mb: 0.6, pl: 2}}>
           Travel Information:
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 0.6, pl: 2 }}>
            Depart to Dest: {post.data.departLoc} to {post.data.dest}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 0.6, pl: 2 }}>
            Departure Time: {post.data.departTime}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 0.6, pl: 2 }}>
            Flight Number: {post.data.flightNumber}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1.2, pl: 2 }}>
            Group Size: {post.data.groupSize}, looking for {post.data.members === undefined ? post.data.groupSize : post.data.groupSize - post.data.members.length - 1} more!
          </Typography>
          <Typography variant="h5" color="text.primary" sx={{ mb: 0.6, pl: 2 }}>
            Current members:
          </Typography>
          {post.data.members !== undefined && post.data.members.length > 0 ? (
  post.data.members.map((member) => (
    <Typography display="flex" variant="h6" alignItems='center' color="text.secondary" key={member} sx={{ mb: 0.6, pl: 2 }}>
        <ListItemIcon sx={{ minWidth: 'unset', marginRight: '0.5rem' }}>
          {/* <Icon>
            <PersonIcon />
          </Icon> */}
          <Avatar sx={{width: 30, height: 30, backgroundColor: 'lightgrey'}} alt={member} src={profilePictures[member]} />
        </ListItemIcon>
        {member}
      </Typography>
  ))
) : (
  <Typography variant="h6" color="text.secondary" sx={{ mb: 0.6, pl: 2 }}>
    No members currently.
  </Typography>
)}

    </DialogContent>


    <DialogActions
      sx={{
        justifyContent: 'flex-end',
        mb: 2,
        pr: 3, 
      }}
    >
      <Button onClick={handleInfoClose}>Close</Button>
    </DialogActions>
        </Dialog>
      ))}
    </div>
  );
}