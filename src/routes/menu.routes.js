import express from 'express';
import {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  toggleAvailability
} from '../controllers/menu.controller.js';

import authRequired from '../middlewares/authRequired.js';
import { allowRoles } from '../middlewares/roleCheck.js';

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);

router.post('/', authRequired, allowRoles('admin', 'staff'), addItem);
router.put('/:id', authRequired, allowRoles('admin', 'staff'), updateItem);
router.delete('/:id', authRequired, allowRoles('admin', 'staff'), deleteItem);
router.patch('/:id/availability', authRequired, allowRoles('admin', 'staff'), toggleAvailability);

export default router;
