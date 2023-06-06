import axios from 'axios';
const url = 'http://localhost:4000/bruinshare';

export const updateProfile = async (userID, newProfile) => {
    try {
        const updatedUser = await axios.post(`${url}/editProfile`, {userID, newProfile});
        return updatedUser;
    } catch (error) {
        console.error(error.message);
        console.error("Failed to update profile");
  }
  return null;
};
