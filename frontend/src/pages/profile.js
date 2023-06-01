import { useEffect } from "react";
import styles from "@/styles/Profile.module.css";

export default function Profile({profile}) {
    return (
      <div class="profile-container">
        <div class="profile-left">
          <div class="profile-image">
            <img src="profile_picture.jpg" alt="Profile Picture" class="center" />
          </div>
          <h1 class="profile-name">John Doe</h1>
          <p class="profile-username">@johndoe</p>
          <p class="profile-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="profile-right">
          <div class="profile-info">
            <div class="info-row">
              <span class="info-label">Email</span>
              <span class="info-value">johndoe@example.com</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone</span>
              <span class="info-value">123-456-7890</span>
            </div>
            <div class="info-row">
              <span class="info-label">Living Location</span>
              <span class="info-value">City, Country</span>
            </div>
            <div class="info-row">
              <span class="info-label">Interests &amp; Hobbies</span>
              <span class="info-value">Reading, Traveling, Cooking</span>
            </div>
          </div>
        </div>
      </div>      
  );
  }