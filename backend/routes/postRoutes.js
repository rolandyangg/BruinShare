import express from 'express';

import{
    getPosts,
    getFilteredPosts,
    createPost,
    getUserPosts,
    joinGroup,
} from '../controllers/postController.js'
  
  const router = express.Router();
  
  router.get('/', (req, res) => {
    res.send('We are live!');
  });
  
  //get all posts
  router.get('/getPosts', getPosts);

  //get filterest posts
  router.get('/getFilteredPosts', getFilteredPosts);

  //create new post
  router.post('/createPost', createPost);

  //get user posts
  router.post('/getUserPosts', getUserPosts);

  //join a post group
  router.post('/joinGroup', joinGroup);
  
  export default router;
  