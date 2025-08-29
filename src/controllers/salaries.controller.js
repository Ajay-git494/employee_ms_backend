import { db } from '../db/knex.js';

export async function listSalaryHistory(req, res, next) {
  try {
    const employee_id = Number(req.params.employeeId);

    
    const employee = await db('employees')
      .select('id', 'full_name', 'current_salary')
      .where({ id: employee_id })
      .first();

    if (!employee) return res.status(404).json({ error: "Employee not found" });

    
    const salaryHistory = await db('salary_history')
      .where({ employee_id })
      .orderBy('increment_date', 'desc');

    
    res.json({
      employee: {
        id: employee.id,
        full_name: employee.full_name,
        current_salary: employee.current_salary,
      },
      salaryHistory,
    });
  } catch (e) {
    next(e);
  }
}



export async function addIncrement(req, res, next) {
  try {
    const employee_id = Number(req.params.employeeId);
    const { increment_date, old_salary, new_salary, remarks } = req.body;

    await db.transaction(async (trx) => {
      await trx('salary_history').insert({ employee_id, increment_date, old_salary, new_salary, remarks });
      await trx('employees').where({ id: employee_id }).update({
        current_salary: new_salary,
        last_increment_date: increment_date,
        updated_at: trx.fn.now()
      });
    });

    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
}
