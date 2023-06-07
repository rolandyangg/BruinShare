import axios from 'axios';
const url = 'http://localhost:4000/bruinshare';

export const updateProfile = async (userID, newProfile, picRef) => {
    try {
        const updatedUser = await axios.post(`${url}/editProfile`, {userID, newProfile, picRef});
        return updatedUser;
    } catch (error) {
        console.error(error.message);
        console.error("Failed to update profile");
  }
  return null;
};

export const getUserByUsername = async (username) => {
    try {
      const response = await axios.get(`${url}/profile/${username}`);
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw new Error('Failed to fetch user profile');
    }
  };
