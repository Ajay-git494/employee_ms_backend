import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { listLeaves, addLeave, deleteLeave } from '../controllers/leaves.controller.js';

const router = Router();
router.use(auth(true));

router.get('/:employeeId', requireRole(['Manager','HR']), listLeaves);
router.post('/:employeeId', requireRole(['Manager','HR']), addLeave);
router.delete('/:id', requireRole(['Manager','HR']), deleteLeave);

export default router;
