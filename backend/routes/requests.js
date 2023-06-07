import express from 'express';

import{
  getUsers,
  createUser,
  getUserByID,
} from '../controllers/controllers.js'

const router = express.Router();

router.get('/', (req, res) => {
  res.send('We are live!');
});

//get all users
router.get('/getUsers', getUsers);

//create new user
router.post('/createUser', createUser);

//get a user by their username
router.post('/getUserByID', getUserByID)

export default router;
