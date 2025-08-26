import { Router } from 'express';
 import { auth, requireRole } from '../middleware/auth.js';


import { createEmployeeRules, updateEmployeeRules } from '../validators/employees.validators.js';
import { listEmployees, createEmployee, updateEmployee, deactivateEmployee,getEmployeeByIdWithColumns, getEmployeeByIdWithoutColumn } from '../controllers/employees.controller.js';

const router = Router();

router.use(auth(true)); // all employee routes require auth

router.get('/', requireRole(['Manager','HR']), listEmployees);
router.post('/', requireRole(['HR','Manager']), createEmployeeRules, createEmployee);
router.put('/:id', requireRole(['HR','Manager']), updateEmployeeRules, updateEmployee);
router.patch('/:id/deactivate', requireRole(['HR','Manager']), deactivateEmployee);
router.get('/:id/with-columns', requireRole(['Manager', 'HR']), getEmployeeByIdWithColumns);
router.get('/:id',requireRole(['Manager','HR']),getEmployeeByIdWithoutColumn);
export default router;
