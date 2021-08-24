import { Router } from 'express';

import {
  getDishes,
  updateDish,
  postDish,
  deleteDish,
  getDishesByQuery,
  getDish,

} from '../controllers/ProductController.js';

import auth from "../middlewares/auth.js"


let router = Router();


router.get('/list', getDishes);
router.get('/query', getDishesByQuery);
router.post('/list', postDish);

//for the ids
router.get('/:dishId', getDish)
router.patch('/:dishId', auth, updateDish);
router.delete('/:dishId', auth, deleteDish);



export default router;
