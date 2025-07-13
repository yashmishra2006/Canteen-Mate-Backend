import express from 'express';
import {
  getTotalSales,
  getPopularItems,
  getOrderStatusStats
} from '../controllers/analytics.controller.js';

import authRequired from '../middlewares/authRequired.js';
import { allowRoles } from '../middlewares/roleCheck.js';

const router = express.Router();
router.use(authRequired, allowRoles('admin', 'staff'));

router.get('/sales', getTotalSales);
router.get('/popular-items', getPopularItems);
router.get('/orders', getOrderStatusStats);

export default router;
