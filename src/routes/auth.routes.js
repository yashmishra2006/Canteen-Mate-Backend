import { Router } from 'express';
import { login, register, logout, getCurrentUser } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import validateRequest from '../middlewares/validateRequest.js';
import authRequired from '../middlewares/authRequired.js';  // Import the middleware

const router = Router();

// POST /auth/register -> Register a new user
router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  validateRequest,
  register
);

// POST /auth/login -> Login a user
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  validateRequest,
  login
);

// POST /auth/logout -> Logout a user
router.post('/logout', logout);

// GET /auth/me -> Get current authenticated user data
router.get('/me', authRequired, getCurrentUser);  // This is the protected route

export default router;
