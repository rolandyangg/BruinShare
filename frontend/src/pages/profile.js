import { useEffect } from "react";
import styles from "@/styles/Profile.module.css";
import Image from "next/image";

export default function Profile({profile}) {
    return (
     <div>
      <div className={styles.profile_container}>
        <div className={styles.profile_left}>
        <button className={styles.edit_profile_button}>Edit Profile</button>
          <div className={styles.profile_image}>
          <img src="" alt="Profile Picture" className={styles.center} />
          </div>
          <h1 className={styles.profile_name}>{profile.firstname}</h1>
          <p className={styles.profile_username}>{profile.username}</p>
          <p className={styles.profile_description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className={styles.profile_right}>
          <div className={styles.profile_info}>
            <div className={styles.info_row}>
              <span className={styles.info_label}>Email</span>
              <span className={styles.info_value}>{profile.username}</span>
            </div>
            <div className={styles.info_row}>
              <span className={styles.info_label}>Phone</span>
              <span className={styles.info_value}>{profile.phone}</span>
            </div>
            <div className={styles.info_row}>
              <span className={styles.info_label}>Living Location</span>
              <span className={styles.info_value}>Delta Terrace</span>
            </div>
            <div className={styles.info_row}>
              <span className={styles.info_label}>Interests &amp; Hobbies</span>
              <span className={styles.info_value}>This user has not provided their interests and hobbies.</span>
            </div>
          </div>
        </div>
      </div>    
    </div>  
  );
  }