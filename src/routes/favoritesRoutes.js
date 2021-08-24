import { Router } from 'express';



import {
  getFavorites,
  postFavorite,
  deleteFavoriteItem
} from '../controllers/favoritesController.js';

import auth from '../middlewares/auth.js';


let router = Router();
router.get('/list',auth, getFavorites);
router.post('/:dishId', auth, postFavorite);
router.delete('/:dishId', auth, deleteFavoriteItem);


export default router;