export const allowRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.userRole || req.user?.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied: insufficient role' });
    }

    next();
  };
};
