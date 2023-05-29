import express from 'express';

import{
    getPosts,
    createPost,
} from '../controllers/postController.js'
  
  const router = express.Router();
  
  router.get('/', (req, res) => {
    res.send('We are live!');
  });
  
  //get all posts
  router.get('/getPosts', getPosts);
  
  //create new post
  router.post('/createPost', createPost);
  
  export default router;
  