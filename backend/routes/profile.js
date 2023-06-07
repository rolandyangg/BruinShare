import express from 'express';

import {
  editProfile,
  getUserProfile, 
} from '../controllers/profileController.js';

const router = express.Router();

router.post("/editProfile", editProfile);
router.get('/profile/:username', getUserProfile);

export default router;
