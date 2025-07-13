import express from 'express';
import { getAllOrders, updateOrderStatus } from '../controllers/order.controller.js';
import authRequired from '../middlewares/authRequired.js';
import { allowRoles } from '../middlewares/roleCheck.js';

const router = express.Router();

router.use(authRequired, allowRoles('admin', 'staff'));

router.get('/orders', getAllOrders);
router.patch('/orders/:id/status', updateOrderStatus);

export default router;
