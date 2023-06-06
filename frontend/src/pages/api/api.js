// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
const url = 'http://localhost:4000/bruinshare';

export const getUsers = async () => {
  try {
    const users = await axios.get(`${url}/getUsers`);
    return users;
  } catch (error) {
    console.error(error.message);
    console.error('could not get all users!');
  }
  return null;
};

export const getUserByID = async (userID) => {
  try {
    const user = await axios.post(`${url}/getUserByID`, {userID});
    return user;
  } catch (error) {
    console.error(error.message);
    console.error('could not get this user!');
  }
  return null;
}

export const createUser = async (newProfile) => {
  try {
    const newUser = await axios.post(`${url}/createUser`, {newProfile});
    return newUser;
  } catch (error) {
    console.error(error.message);
    console.error('could not create a new user!');
  }
  return null;
};