import { useState, useEffect } from "react";
import styles from "@/styles/Profile.module.css";
import Image from "next/image";
import * as api from "../pages/api/profile.js";
import * as userApi from "../pages/api/api.js";
import {storage, db, app} from "../../../backend/firebase.js"
import { ref, uploadBytes } from "firebase/storage";

export default function Profile({ profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  
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
    console.log(editedProfile);
    if (editedProfile.profilePicture) {
      console.log(profile.username);
      const fileRef = ref(storage, `profilePictures/${profile.username}`);
      await uploadBytes(fileRef, editedProfile.profilePicture);
    }
    api.updateProfile(profile.username, editedProfile);
    userApi.getUserByID(profile.username);
    setIsEditing(false);
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
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className={styles.profile_container}>
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
      </div>
    </div>
  );
}
