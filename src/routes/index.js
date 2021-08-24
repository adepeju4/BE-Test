import express from 'express';
const router = express.Router();

import productRoute from './productRoute.js';
import reviewsRoute from './reviewsRoute.js'
import cartRoute from './cartRoute.js'

router.use('/dishes', productRoute);
router.use('/dishes', reviewsRoute);
router.use('/cart', cartRoute);


export default router;
