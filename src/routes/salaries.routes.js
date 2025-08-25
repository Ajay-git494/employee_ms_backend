import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { listSalaryHistory, addIncrement} from '../controllers/salaries.controller.js';

const router = Router();
router.use(auth(true));

router.get('/:employeeId', requireRole(['Manager','HR']), listSalaryHistory);
router.post('/:employeeId', requireRole(['Manager','HR']), addIncrement);


export default router;
