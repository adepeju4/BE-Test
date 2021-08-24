import express from 'express';
const router = express.Router();

import productRoute from './productRoute.js';
import reviewsRoute from './reviewsRoute.js';
import cartRoute from './cartRoute.js';
import favoritesRoutes from './favoritesRoutes.js';

router.use('/dishes', productRoute);
router.use('/dishes', reviewsRoute);
router.use('/cart', cartRoute);
router.use('/favorites', favoritesRoutes);


export default router;
