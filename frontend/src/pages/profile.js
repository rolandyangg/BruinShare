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

  console.log(editedProfile);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile({
      description:
        profile.description || "This user has not put a description of themselves :(",
      email: profile.email || "",
      phone: profile.phone || "",
      location: profile.location || "",
      interests: profile.interests || "",
    });
  };

  const handleSaveProfile = async () => {
    let picRef = null;
    //set profile picture
    if (image) {
      console.log("EKLRJWELKRJSLK")
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
          <Grid container columnSpacing={3} textAlign="center">
            <Grid container item md={6} direction="column" alignItems="center" justifyContent="center">
              {isEditing ? (
                <div>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      {/* <MuiFileInput value={image} onChange={handleImageChange} /> */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.edit_profile_file_input}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography mt={4} variant="h5" gutterBottom textAlign="center">{profile.firstname}</Typography>
                      <Typography variant="subtitle1" gutterBottom textAlign="center">{profile.username}</Typography>
                    </Grid>
                    <Grid item xs={12} mt={2} alignItems="center" justifyContent="center">
                      <TextField
                        label="Description"
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
                        src="profilePic.png"
                        alt={editedProfile.firstname}
                        sx={{
                          width: '300px',
                          height: '300px',
                          fontSize: "6.0rem",
                        }}
                        priority
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography mt={4} variant="h5" gutterBottom textAlign="center">{profile.firstname}</Typography>
                      <Typography variant="subtitle1" gutterBottom textAlign="center" mb={3}>{profile.username}</Typography>
                      <Box sx={{width: "400px"}}>
                        <Typography variant="body" gutterBottom textAlign="center">{editedProfile.description}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              )}
            </Grid>
            <Grid container item md={6} direction="column">
              <Grid item m={2}>
                {isEditing ? (
                  <TextField
                    fullWidth
                    id="outlined-start-adornment"
                    label="Email"
                    name="email"
                    value={editedProfile.email}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                    }}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div>
                    <Typography variant="h6">Email</Typography>
                    <Typography variant="body">{editedProfile.email}</Typography>
                  </div>
                )}
              </Grid>

              <Grid item m={2}>
                {isEditing ? (
                  <TextField
                    fullWidth
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
                    <Typography variant="h6">Phone</Typography>
                    <Typography variant="body">{editedProfile.phone}</Typography>
                  </div>
                )}
              </Grid>

              <Grid item m={2}>
                {isEditing ? (
                  <TextField
                    fullWidth
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
                    <Typography variant="h6">Location</Typography>
                    <Typography variant="body">{editedProfile.location}</Typography>
                  </div>
                )}
              </Grid>

              <Grid item m={2}>
                {isEditing ? (
                  <TextField
                    fullWidth
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
                    <Typography variant="h6">Interests</Typography>
                    <Typography variant="body">{editedProfile.interests}</Typography>
                  </div>
                )}
              </Grid>

              <Grid item m={2}>
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
                      onClick={handleSaveProfile}
                    >
                      Save
                    </Button>
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      sx={{ mt: 2, mb: 2 }}
                      onClick={handleCancelEdit}>
                      Cancel
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
