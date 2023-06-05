import axios from 'axios';
const url = 'http://localhost:4000/bruinshare';

export const updateProfile = async (userID, newProfile) => {
    try {
        console.log("HERE")
        const updatedUser = await axios.post(`${url}/editProfile`, {userID, newProfile});
        console.log("hurdur")
        return updatedUser;

    //     const response = await fetch(`/profile`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ id: profile.id, ...editedProfile }),
    //     });
    
    //     if (response.ok) {
    //       setIsEditing(false);
    //       console.log("Profile updated successfully");
    //     } else {
    //       console.error("Failed to update profile");
    //     }
    //   } 
      
    } catch (error) {
        console.error(error.message);
        console.error("Failed to update profile");
  }
  return null;
};
