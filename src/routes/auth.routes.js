import { Router } from 'express';
import { login,createUser } from '../controllers/auth.controller.js';
import { loginRules } from '../validators/auth.validators.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/login', loginRules, login);

// Manager creates users (HR or Manager)
router.post('/users', auth(true), requireRole(['Manager','HR']), async (req, res, next) => {
  try { await createUser(req, res, next); } catch (e) { next(e); }
});

export default router;
