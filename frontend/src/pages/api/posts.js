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
    const response = await axios.post(`${url}/getUserPosts`, {username});
    // console.log(posts);
    const {posts, joined} = response.data;
    return {posts, joined};
  } catch (error) {
    console.error(error.message);
    console.error('could not get all of users posts!');
  }
  return null;
};

export const joinGroup = async (username, postID) => {
  try {
    const posts = await axios.post(`${url}/joinGroup`, {username, postID});
    return posts;
  } catch (error) {
    console.error(error.message);
    console.error('could not join the post group!');
  }
  return null;
};

export const leaveGroup = async (username, postID) => {
  try {
    const posts = await axios.post(`${url}/leaveGroup`, {username, postID});
    return posts;
  } catch (error) {
    console.error(error.message);
    console.error('could not leave the post group!');
  }
  return null;
}

export const deletePost = async (postID) => {
  try {
    const posts = await axios.post(`${url}/deletePost`, {postID});
    return posts;
  } catch (error) {
    console.error(error.message);
    console.error('could not delete the post!');
  }
  return null;
}