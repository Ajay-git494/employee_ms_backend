import { db } from '../db/knex.js';

import { validationResult } from 'express-validator';

export async function listEmployees(req, res, next) {
  try {
    const { q, status } = req.query;
    let query = db('employees').select('*').orderBy('id', 'asc');
    if (q) query.where('full_name', 'like', `%${q}%`).orWhere('email', 'like', `%${q}%`);
    if (status) query.where({ status });
    const rows = await query;
    res.json(rows);
  } catch (e) { next(e); }
}

export async function createEmployee(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const payload = req.body;

    
    const existing = await db('employees').where({ email: payload.email }).first();
    if (existing) {
      return res.status(400).json({ error: "Email already exists, please use another email." });
    }

    
    const [id] = await db('employees').insert(payload);
    const created = await db('employees').where({ id }).first();

    res.status(201).json(created);

  } catch (e) {
    next(e);
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const id = Number(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    await db('employees').where({ id }).update({ ...req.body, updated_at: db.fn.now() });
    const updated = await db('employees').where({ id }).first();
    res.json(updated);
  } catch (e) { next(e); }
}

export async function deactivateEmployee(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { reason, date } = req.body;
    await db('employees').where({ id }).update({
      status: 'Inactive',
      deactivation_date: date || db.fn.now(),
      deactivation_reason: reason || 'No reason provided',
      updated_at: db.fn.now()
    });
    const updated = await db('employees').where({ id }).first();
    res.json(updated);
  } catch (e) { next(e); }
}


// -----------------------------------------------------------------------------------------------------------
export async function getEmployeeByIdWithColumns(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid employee ID" });

    
    const employee = await db('employees').where({ id }).first();
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    
    const columns = await db.raw(`SHOW COLUMNS FROM employees`);
    
    const result = columns[0].map(col => ({
      column: col.Field,
      value: employee[col.Field] ?? null
    }));
    res.json({ id, details: result });
  } catch (e) { next(e); }
}
//--------------------------------------------------------------------------------------------------------------
export async function getEmployeeByIdWithoutColumn(req,res,next) {
  try {
    const id=Number(req.params.id);
    if(isNaN(id)) return res.status(404).json({error:'Employee not Found Invalid Emplyee Id'});
    const employee=await db('employees').where({id}).first();
    if(!employee) return res.status(404).json({error:'Employee not Found'});
    res.json({employee});
  } catch (error) {
    next(error);
  }
} 