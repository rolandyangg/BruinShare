import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FormControl, MenuItem, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from '@/styles/postDialog.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import * as api from "../pages/api/posts.js";

export default function CustomizedDialogs({ profile }) {
  const [open, setOpen] = React.useState(false);

  //define our form
  const [formData, setFormData] = React.useState({
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

  //submit form
  const handleCreatePost = (e) => {
    e.preventDefault();
    // Create the post using the form data
    const newPost = {
        departLoc: formData.departLoc,
        dest: formData.dest,
        departDate: formData.departDate,
        departTime: formData.departTime,
        flightTime: formData.flightTime,
        flightNumber: formData.flightNumber,
        flightDest: formData.flightDest,
        groupSize: formData.groupSize,
    };
  
    // Call a function or API to save the post to the database
    api.createPost(newPost);

    setPosts((prevPosts) => [...prevPosts, createdPost]);
  
    // Reset the form after saving the post
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
      <h2>{profile.firstname}</h2> 
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
    </div>
  );
}

