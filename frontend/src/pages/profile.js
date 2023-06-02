import { useState } from "react";
import styles from "@/styles/Profile.module.css";
import Image from "next/image";

export default function Profile({ profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    description: profile.description,
  });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile({ description: profile.description });
  };

  const handleSaveProfile = () => {
    // Perform the necessary logic to save the edited profile
    // ...

    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedProfile((prevState) => ({
        ...prevState,
        profilePicture: reader.result,
      }));
    };

    if (file) {
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
          <h1 className={styles.profile_name}>{profile.firstname}</h1>
          <p className={styles.profile_username}>{profile.username}</p>
          <p className={styles.profile_description}>
            {isEditing ? (
              <textarea
                name="description"
                value={editedProfile.description}
                onChange={handleInputChange}
              ></textarea>
            ) : (
              profile.description
            )}
          </p>
        </div>
        <div className={styles.profile_right}>
          {!isEditing ? (
            <button className={styles.profile_button} onClick={handleEditProfile}>
              Edit Profile
            </button>
          ) : (
            <div>
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
              <span className={styles.info_label}>Email</span>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                  className={styles.edit_profile_input}
                />
              ) : (
                <span className={styles.info_value}>{profile.email}</span>
              )}
            </div>
            <div className={styles.info_row}>
              <span className={styles.info_label}>Phone</span>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editedProfile.phone}
                  onChange={handleInputChange}
                  className={styles.edit_profile_input}
                />
              ) : (
                <span className={styles.info_value}>{profile.phone}</span>
              )}
            </div>
            <div className={styles.info_row}>
              <span className={styles.info_label}>Living Location</span>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={editedProfile.location}
                  onChange={handleInputChange}
                  className={styles.edit_profile_input}
                />
              ) : (
                <span className={styles.info_value}>{profile.location}</span>
              )}
            </div>
            <div className={styles.info_row}>
              <span className={styles.info_label}>Interests &amp; Hobbies</span>
              {isEditing ? (
                <input
                  type="text"
                  name="interests"
                  value={editedProfile.interests}
                  onChange={handleInputChange}
                  className={styles.edit_profile_input}
                />
              ) : (
                <span className={styles.info_value}>{profile.interests}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
