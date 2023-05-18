import express from 'express';

import{
  getUsers
} from '../controllers/controllers.js'

const router = express.Router();

router.get('/', (req, res) => {
  res.send('We are live!');
});

//get all users
router.get('/getUsers', getUsers);

export default router;
