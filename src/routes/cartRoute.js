import { Router } from 'express';


import {
    getCartItems,
    getCartItem,
    postCartItem,
    deleteCartItem
} from '../controllers/cartController.js';

import auth from '../middlewares/auth.js';

let router = Router();

router.get("/list", getCartItems)
router.get("/:userId", getCartItem)
router.post("/:dishId", auth, postCartItem)


//Cart IDs
router.delete("/:dishId", auth, deleteCartItem)

export default router;