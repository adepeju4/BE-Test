import { Router } from 'express';


import {
  getReview,
  getReviews,
  postReviews,
  deleteReviews,
  deleteReview
} from '../controllers/reviewsController.js';

import auth from '../middlewares/auth.js';


let router = Router();

router.get('/reviews/list', getReviews)
router.post('/:dishId/reviews', postReviews);
router.delete('/:dishId/reviews', auth, deleteReviews);


//for each review id
router.get('/:dishId/reviews/:reviewId', auth, getReview);
router.delete('/:dishId/reviews/:reviewId', auth,deleteReview);

export default router;