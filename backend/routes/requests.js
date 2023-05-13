import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('We are live!');
});

export default router;
