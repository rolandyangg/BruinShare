import { useEffect } from "react";
import styles from "@/styles/Profile.module.css";
import Image from "next/image";
import Navbar from '@/Navbar.js';

export default function Profile({profile}) {
    return (
     <div>
      <Navbar/>
      <div class={styles.profile-container}>
        <div class={styles.profile-left}>
          <div class={styles.profile-image}>
          <img src="" alt="Profile Picture" class={styles.center} />
          </div>
          <h1 class={styles.profile-name}>{profile.firstname}</h1>
          <p class={styles.profile-username}>{profile.username}</p>
          <p class={styles.profile-description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class={styles.profile-right}>
          <div class={styles.profile-info}>
            <div class={styles.info-row}>
              <span class={styles.info-label}>Email</span>
              <span class={styles.info-value}>{profile.username}</span>
            </div>
            <div class={styles.info-row}>
              <span class={styles.info-label}>Phone</span>
              <span class={styles.info-value}>{profile.phone}</span>
            </div>
            <div class={styles.info-row}>
              <span class={styles.info-label}>Living Location</span>
              <span class={styles.info-value}>Delta Terrace</span>
            </div>
            <div class={styles.info-row}>
              <span class={styles.info-label}>Interests &amp; Hobbies</span>
              <span class={styles.info-value}>This user has not provided their interests and hobbies.</span>
            </div>
          </div>
        </div>
      </div>    
    </div>  
  );
  }