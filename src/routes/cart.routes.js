import express from 'express';
import {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItem
} from '../controllers/cart.controller.js';

import authRequired from '../middlewares/authRequired.js';

const router = express.Router();

router.get('/', authRequired, getCart);
router.post('/items', authRequired, addItemToCart);
router.patch('/items/:itemId', authRequired, updateItemQuantity);
router.delete('/items/:itemId', authRequired, removeItem);

export default router;
