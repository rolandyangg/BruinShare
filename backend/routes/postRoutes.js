import express from 'express';

import{
    getPosts,
    createPost,
    getUserPosts,
    joinGroup,
    leaveGroup,
} from '../controllers/postController.js'
  
  const router = express.Router();
  
  router.get('/', (req, res) => {
    res.send('We are live!');
  });
  
  //get all posts
  router.get('/getPosts', getPosts);
  
  //create new post
  router.post('/createPost', createPost);

  //get user posts
  router.post('/getUserPosts', getUserPosts);

  //join a post group
  router.post('/joinGroup', joinGroup);

  //leave a post group
  router.post('/leaveGroup', leaveGroup);
  
  export default router;
  