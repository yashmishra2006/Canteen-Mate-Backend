// This middleware validates the request using express-validator

import { validationResult } from 'express-validator';

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
