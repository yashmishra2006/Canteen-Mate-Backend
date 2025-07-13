import express from 'express';
import {
  placeOrder,
  getMyOrders,
  getOrderById
} from '../controllers/order.controller.js';

import authRequired from '../middlewares/authRequired.js';

const router = express.Router();

router.use(authRequired); // All routes need login

router.post('/', placeOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrderById);

export default router;
