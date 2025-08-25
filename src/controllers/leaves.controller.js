import { db } from '../db/knex.js';

export async function listLeaves(req, res, next) {
  try {
    const employee_id = Number(req.params.employeeId);
    const { month, year, type } = req.query;

    let q = db('leave_records').where({ employee_id }).orderBy('leave_date', 'desc');
    if (type) q.andWhere('leave_type', type);
    if (month && year) {
      q.andWhereRaw('MONTH(leave_date) = ? AND YEAR(leave_date) = ?', [Number(month), Number(year)]);
    }

    res.json(await q);
  } catch (e) { next(e); }
}

export async function addLeave(req, res, next) {
  try {
    const employee_id = Number(req.params.employeeId);
    const { leave_date, leave_type, leave_count = 1 } = req.body;

    const [id] = await db('leave_records').insert({ employee_id, leave_date, leave_type, leave_count });
    const created = await db('leave_records').where({ id }).first();
    res.status(201).json(created);
  } catch (e) { next(e); }
}

export async function deleteLeave(req, res, next) {
  try {
    const id = Number(req.params.id);
    await db('leave_records').where({ id }).del();
    res.json({ ok: true });
  } catch (e) { next(e); }
}
