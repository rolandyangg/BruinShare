import express from 'express';

import{
    getPosts,
    createPost,
    getUserPosts,
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
  
  export default router;
  