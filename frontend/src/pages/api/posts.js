// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
const url = 'http://localhost:4000/bruinshare';

export const getPosts = async () => {
  try {
    const posts = await axios.get(`${url}/getPosts`);
    return posts;
  } catch (error) {
    console.error(error.message);
    console.error('could not get all posts!');
  }
  return null;
};

export const createPost = async (newPost) => {
  try {
    console.log(newPost)
    const newPosting = await axios.post(`${url}/createPost`, newPost);
    return newPosting;
  } catch (error) {
    console.error(error.message);
    console.error('could not create a new post!');
  }
  return null;
};

export const getUserPosts = async (username) => {
  try {
    const posts = await axios.post(`${url}/getUserPosts`, {username});
    return posts;
  } catch (error) {
    console.error(error.message);
    console.error('could not get all of users posts!');
  }
  return null;
};