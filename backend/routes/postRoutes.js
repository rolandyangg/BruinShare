import express from 'express';

import{
    getPosts,
    getFilteredPosts,
    createPost,
    getUserPosts,
    joinGroup,
    leaveGroup,
    deletePost,
} from '../controllers/postController.js'
  
  const router = express.Router();
  
  router.get('/', (req, res) => {
    res.send('We are live!');
  });
  
  //get all posts
  router.get('/getPosts', getPosts);

  //get filterest posts
  router.post('/getFilteredPosts', getFilteredPosts);

  //create new post
  router.post('/createPost', createPost);

  //get user posts
  router.post('/getUserPosts', getUserPosts);

  //join a post group
  router.post('/joinGroup', joinGroup);

  //leave a post group
  router.post('/leaveGroup', leaveGroup);

  //delete a post
  router.post('/deletePost', deletePost);
  
  
  export default router;
  