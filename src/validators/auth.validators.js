// import { body } from 'express-validator';

// export const loginRules = [
//   body('username').trim().notEmpty(),
//   body('password').notEmpty()
// ];
// validators/auth.validators.js
import { body, validationResult } from 'express-validator';

export const loginRules = [
  body('username').trim().notEmpty(),
  body('password').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
