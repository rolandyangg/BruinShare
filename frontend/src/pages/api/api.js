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