import { Router } from 'express';


import {
  getReview,
  
  postReviews,
  deleteReviews,
  deleteReview,
  updateReview,
} from '../controllers/reviewsController.js';



let router = Router();

router.post('/:dishId/reviews', postReviews);
router.delete('/:dishId/reviews', deleteReviews);


//for each review id
router.get('/:dishId/reviews/:reviewId', getReview);
router.put('/:dishId/reviews/:reviewId', updateReview);
router.delete('/:dishId/reviews/:reviewId', deleteReview);

export default router;