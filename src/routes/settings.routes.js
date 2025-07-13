import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import authRequired from '../middlewares/authRequired.js';
import { allowRoles } from '../middlewares/roleCheck.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', authRequired, allowRoles('admin', 'staff'), updateSettings);

export default router;
