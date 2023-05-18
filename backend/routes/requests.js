import express from 'express';

import{
  getUsers,
  createUser,
} from '../controllers/controllers.js'

const router = express.Router();

router.get('/', (req, res) => {
  res.send('We are live!');
});

//get all users
router.get('/getUsers', getUsers);

//create new user
router.post('/createUser', createUser);

export default router;
