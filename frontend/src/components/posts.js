import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FormControl, MenuItem, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
      {/* button to open dialog */}
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Post
      </Button>
      {/* defining the dialog */}
      <Dialog open={open} onClose={handleClose}>
        <div className={styles.dialogContainer}>
          <h3 className={styles.dialogTitle}>Create Post</h3>
          <DialogContent className={styles.dialogContent}>
            {/* all the content in the dialog */}
            <form onSubmit={handleCreatePost}>
              <div className={styles.inputContainer}>
                <label htmlFor="departLoc">Depart. Location:</label>
                <input
                  type="text"
                  id="departLoc"
                  name="departLoc"
                  value={formData.departLoc}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="dest">Destination:</label>
                <input
                  type="text"
                  id="dest"
                  name="dest"
                  value={formData.dest}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="departDate">Depart. Date:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        value={formData.departDate}
                        onChange={(date) => handleInputChange({ target: { name: 'departDate', value: date.toISOString() } })}
                    />
                </LocalizationProvider>
              </div>

            <div className={styles.inputContainer}>
                <label htmlFor="departTime">Depart. Time:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                  <TimePicker
                    value={formData.departTime}
                    onChange={(time) => handleInputChange({ target: { name: 'departTime', value: time.toISOString()} })}
                  />
                </LocalizationProvider>
            </div>
              <div className={styles.inputContainer}>
                <label htmlFor="flightTime">Flight Time:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={formData.flightTime}
                      onChange={(time) => handleInputChange({ target: { name: 'flightTime', value: time.toISOString()} })}
                    />
                
                </LocalizationProvider>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="flightNumber">Flight Number:</label>
                <input
                  type="text"
                  id="flightNumber"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="flightDest">Flight Dest.:</label>
                <input
                  type="text"
                  id="flightDest"
                  name="flightDest"
                  value={formData.flightDest}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="number">Group Size (including you):</label>
                <FormControl>
                  <Select
                    value={formData.groupSize}
                    onChange={(event) =>
                      handleInputChange({
                        target: { name: 'groupSize', value: event.target.value },
                      })
                    }
                    name="groupSize"
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.buttonContainer}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Publish</Button>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
      {/* display all posts */}
      <div className={styles.postContainer}>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <div className={styles.postContent}>
            <p className={styles.postCreator}>Author: {post.data.creator}</p>
            <p className={styles.departDate}>{post.data.departDate}</p>
            <div className={styles.travelInfo}>
              <p>Depart: {post.data.departLoc}</p>
              <p>Dest: {post.data.dest}</p>
              <p>Depart. Time: {post.data.departTime}</p>
            </div>
            {/* <p>Flight Destination: {post.data.flightDest}</p>
            <p>Flight Number: {post.data.flightNumber}</p>
            <p>Flight Time: {post.data.flightTime}</p> */}
            <p>Group Size: {post.data.groupSize}</p>
          </div>
        </div>
      ))}
    </div>

    </div>
  );
}

