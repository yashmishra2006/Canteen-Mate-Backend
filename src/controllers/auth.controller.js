//Auth Controller.js

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Helper function to generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
const token = generateToken(user.id, user.role);


  // Send response with user data and token
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token  // Send token along with user data
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'student'; // 🔒 Force student role for all public registrations

  if (await User.findOne({ email })) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const user = await User.create({ name, email, password, role });

  const token = generateToken(user.id, role);

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role,
    token
  });
};


// Route to get current user (with JWT verification)
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);  // Get user by userId from the decoded token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Logout handler
export const logout = (_req, res) => {
  res.clearCookie('token');  // Clear the token from cookies
  res.json({ message: 'Logged out successfully' });
};
