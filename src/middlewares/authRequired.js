//Auth Middleware to protect routes

import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.cookies.token;  // Get token from cookies

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;  // Attach userId to the request object for further processing
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
