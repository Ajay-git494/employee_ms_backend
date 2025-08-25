import { body } from 'express-validator';

export const loginRules = [
  body('username').trim().notEmpty(),
  body('password').notEmpty()
];
