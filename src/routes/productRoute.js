import { Router } from 'express';

import {
  getDishes,
  updateDish,
  postDish,
  deleteDish,
  getDishesByQuery,
  getDish,

} from '../controllers/ProductController.js';

let router = Router();


router.get('/list', getDishes);
router.get('/query', getDishesByQuery);
router.post('/list', postDish);

//for the ids
router.get('/:dishId', getDish)
router.patch('/:dishId', updateDish);
router.delete('/:dishId', deleteDish);



export default router;
