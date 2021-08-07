import express from 'express';
const router = express.Router();

import productRoute from './productRoute.js';
import reviewsRoute from './reviewsRoute.js'

router.use('/dishes', productRoute);
router.use('/dishes', reviewsRoute);


export default router;
