import express from 'express';

import {
  editProfile,
} from '../controllers/profileController.js';

const router = express.Router();

router.post("/editProfile", editProfile);

export default router;
