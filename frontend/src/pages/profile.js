import { useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Typography,
  InputAdornment
} from '@mui/material';

import styles from "@/styles/Profile.module.css";
import Image from "next/image";
import * as api from "../pages/api/profile.js";
import * as userApi from "../pages/api/api.js";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.js"

import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InterestsIcon from '@mui/icons-material/Interests';

import { MuiFileInput } from 'mui-file-input'


export default function Profile({ profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [image, setImage] = useState(false);

  useEffect(() => {
    userApi.getUserByID(profile.username).then((response) => {
      if (response) {
        console.log(response.data);
        setEditedProfile(response.data);
      }
    });
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = async () => {
    let picRef = null;
    //set profile picture
    if (image) {
      const fileRef = ref(storage, `profilePictures/${profile.username}`);
      const snapshot = await uploadBytes(fileRef, editedProfile.profilePicture);
      picRef = snapshot.ref;
      setImage(false);
    }
    //update the user's profile
    await api.updateProfile(profile.username, editedProfile, picRef);
    //get the user again to update the page
    userApi.getUserByID(profile.username).then((profile) => {
      setEditedProfile(profile.data);
      setIsEditing(false);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    console.log(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prevState) => ({
          ...prevState,
          profilePicture: file,
        }));
      };
      reader.readAsDataURL(file);
      setImage(true);
    }
  };

  return (
    <div>
      {/* new page: */}
      <div>
        <Box m={2} mt={10}>
          <Grid container columnSpacing={3} textAlign="center" >
            <Grid container item md={6} direction="column" alignItems="center" justifyContent="center" style={{paddingTop: "1.5vh"}}>
              {isEditing ? (
                <div>
                  <Grid container direction="row">
                  <div
                    style={{
                      width: '380px',
                      height: '380px',
                      borderRadius: '50%',
                      backgroundColor: '#dedede',
                      border: '1px solid grey',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: "11vw",
                    }}
                  >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.edit_profile_file_input}
                    style={{
                      display: 'flex',
                      justifyContent: 'left',
                      paddingTop:"9vw",
                      paddingLeft:"5vw",
                      alignItems: 'left',
                      border: 'none', // Remove the border
                      background: 'none', // or background: 'transparent'
                    }}
                  />
                </div>
                    <Grid item xs={12}>
                      <Typography mt={2.5} variant="h4" gutterBottom textAlign="center" style={{fontSize: '1.8rem',}}>{profile.firstname} {profile.lastname}</Typography>
                      <Typography variant="h6">{`Username: ${editedProfile.username}`}</Typography>
                    </Grid>
                    <Grid item xs={12} mt={2} alignItems="center" justifyContent="center" >
                      <TextField
                        label="Bio"
                        name="description"
                        value={editedProfile.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        sx = {{width: "400px"}}
                        defaultValue=""
                      />
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <div>
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                    <Avatar
  src={editedProfile.profilePicture}
  alt={editedProfile.firstname}
  sx={{
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)', // Add the boxShadow property
    fontSize: '6.0rem',
  }}
  priority
/>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography mt={2.5} variant="h5" gutterBottom textAlign="center" style={{fontSize: '1.8rem',}}>{profile.firstname} {profile.lastname}</Typography>
                      <Typography variant="h6">{`Username: ${editedProfile.username}`}</Typography>
                      <Box sx={{width: "400px"}} style={{paddingTop: "10px"}}>
                        <Typography variant="body" gutterBottom textAlign="center">{editedProfile.description}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              )}
            </Grid>
            <Grid container sx={{textAlign: "left"}} item md={6} direction="column" style={{paddingTop: "8vh", paddingLeft: "3vw"}}>
              <Grid item m={2}>
                {isEditing ? (
                  <TextField
                    style={{ width: "35vw" }}
                    id="outlined-start-adornment"
                    label="Email"
                    name="email"
                    value={editedProfile.email}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                    }}
                  />
                ) : (
                  <div>
                    <TextField
                      id="outlined-start-adornment"
                      label="Email"
                      name="email"
                      value={editedProfile.email}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                        style: { color: "black", borderColor: "black", pointerEvents: "none", width: "35vw" }
                      }}
                    />
                  </div>
                )}
              </Grid>

              <Grid item m={2}>
                {isEditing ? (
                  <TextField
                  style={{ width: "35vw" }}
                    id="outlined-start-adornment"
                    label="Phone"
                    name="phone"
                    value={editedProfile.phone}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><LocalPhoneIcon /></InputAdornment>,
                    }}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div>
                    <TextField
                    style={{ width: "35vw" }}
                      id="outlined-start-adornment"
                      label="Phone"
                      name="phone"
                      value={editedProfile.phone}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><LocalPhoneIcon /></InputAdornment>,
                        style: { color: "black", borderColor: "black", pointerEvents: "none" },
                      }}
                    />
                  </div>
                )}
              </Grid>

              <Grid item m={2}>
                {isEditing ? (
                  <TextField
                    style={{ width: "35vw" }}
                    id="outlined-start-adornment"
                    label="Location"
                    name="location"
                    value={editedProfile.location}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
                    }}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div>
                    <TextField
                    style={{ width: "35vw" }}
                    id="outlined-start-adornment"
                    label="Location"
                    name="location"
                    value={editedProfile.location}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
                      style: { color: "black", borderColor: "black", pointerEvents: "none" },
                    }}
                    />
                  </div>
                )}
              </Grid>

              <Grid item m={2} >
                {isEditing ? (
                  <TextField
                    style={{ width: "35vw" }}
                    id="outlined-start-adornment"
                    label="Interests"
                    name="interests"
                    value={editedProfile.interests}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><InterestsIcon /></InputAdornment>,
                    }}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div>
                     <TextField
                      style={{ width: "35vw" }}
                      id="outlined-start-adornment"
                      label="Interests"
                      name="interests"
                      value={editedProfile.interests}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><InterestsIcon /></InputAdornment>,
                        style: { color: "black", borderColor: "black", pointerEvents: "none" },
                      }}
                      
                    />
                  </div>
                )}
              </Grid>

              <Grid item m={2} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "9.6vw" }}>
                {!isEditing ? (
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className={styles.button_group}>
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      sx={{ mt: 2, mb: 2 }}
                      onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      sx={{ mt: 2, mb: 2 }}
                      onClick={handleSaveProfile}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>

      {/* old page: */}
      {/* <div className={styles.profile_container}>
        <div className={styles.profile_left}>
          <div className={styles.profile_image}>
            {isEditing ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.edit_profile_file_input}
              />
            ) : (
              <Image
                src={editedProfile.profilePicture || "/icons/pfp.svg"}
                alt="Profile Picture"
                width={700}
                height={700}
                priority
              />
            )}
          </div>
          <h1 className={styles.profile_name}>{`${editedProfile.firstname} ${editedProfile.lastname}`}</h1>
          <p className={styles.profile_username}>{editedProfile.username}</p>
          <p className={styles.profile_description}>
            {isEditing ? (
              <textarea
                name="description"
                value={editedProfile.description}
                onChange={handleInputChange}
              ></textarea>
            ) : (
              editedProfile.description
            )}
          </p>
        </div>
        <div className={styles.profile_right}>
          {!isEditing ? (
            <button className={styles.profile_button} onClick={handleEditProfile}>
              Edit Profile
            </button>
          ) : (
            <div className={styles.button_group}>
              <button className={styles.profile_button} onClick={handleSaveProfile}>
                Save
              </button>
              <button className={styles.profile_button} onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          )}
          <div className={styles.profile_info}>
            <div className={styles.info_row}>
              <h3 className={styles.info_label}>Email:</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                  className={styles.edit_profile_input}
                />
              ) : (
                <span className={styles.info_value}>{editedProfile.email}</span>
              )}
            </div>
            <div className={styles.info_row}>
              <h3 className={styles.info_label}>Phone Number:</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editedProfile.phone}
                  onChange={handleInputChange}
                  className={styles.edit_profile_input}
                />
              ) : (
                <span className={styles.info_value}>{editedProfile.phone}</span>
              )}
            </div>
            <div className={styles.info_row}>
              <h3 className={styles.info_label}>Living Location:</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={editedProfile.location}
                  onChange={handleInputChange}
                  className={styles.edit_profile_input}
                />
              ) : (
                <span className={styles.info_value}>{editedProfile.location}</span>
              )}
            </div>
            <div className={styles.info_row}>
              <h3 className={styles.info_label}>Interests &amp; Hobbies:</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="interests"
                  value={editedProfile.interests}
                  onChange={handleInputChange}
                  className={styles.edit_profile_input}
                />
              ) : (
                <span className={styles.info_value}>{editedProfile.interests}</span>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}