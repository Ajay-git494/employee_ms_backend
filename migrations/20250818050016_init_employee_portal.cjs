/**
 * Migration: init_employee_portal
 * Creates users, employees, salary_history, and leave_records tables
 * + inserts a default Manager account
 */

module.exports.up = async function (knex) {
  // Users table (login + roles)
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('username').notNullable().unique();
    t.string('password').notNullable(); // bcrypt hash
    t.enu('role', ['Manager', 'HR']).notNullable();
    t.boolean('active').defaultTo(true);
    // t.timestamps(true, true);
    t.timestamp('created_at').defaultTo(knex.fn.now());
t.timestamp('updated_at').nullable();
  });

  // Employees table
  await knex.schema.createTable('employees', (t) => {
    t.increments('id').primary();
    t.string('full_name').notNullable();
    t.string('contact_primary').notNullable();
    t.string('contact_alternate');
    t.string('email').notNullable().unique();
    t.text('address');
    t.date('dob');
    t.string('qualification');
    t.string('document_path');

    // Job details
    t.string('designation');
    t.date('date_of_joining');
    t.string('position_hired_for');
    t.decimal('hired_salary', 10, 2);
    t.decimal('current_salary', 10, 2);
    t.date('last_increment_date');
    t.integer('experience_at_hire');
    t.enu('hiring_status', ['Fresher', 'Experienced']);
    t.integer('prior_experience');
    t.string('job_documents_path');

    // Account status
    t.enu('status', ['Active', 'Inactive']).defaultTo('Active');
    t.date('deactivation_date');
    t.string('deactivation_reason');

    // t.timestamps(true, true);
    t.timestamp('created_at').defaultTo(knex.fn.now());
t.timestamp('updated_at').nullable();
  });

  // Salary history
  await knex.schema.createTable('salary_history', (t) => {
    t.increments('id').primary();
    t.integer('employee_id').unsigned()
      .references('id').inTable('employees').onDelete('CASCADE');
    t.date('increment_date').notNullable();
    t.decimal('old_salary', 10, 2).notNullable();
    t.decimal('new_salary', 10, 2).notNullable();
    t.string('remarks');
    // t.timestamps(true, true);
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').nullable();
  });

  // Leave records
  await knex.schema.createTable('leave_records', (t) => {
    t.increments('id').primary();
    t.integer('employee_id').unsigned()
      .references('id').inTable('employees').onDelete('CASCADE');
    t.date('leave_date').notNullable();
    t.string('leave_type'); // Sick, Casual, Paid, etc.
    t.integer('leave_count').defaultTo(1);
    // t.timestamps(true, true);
    t.timestamp('created_at').defaultTo(knex.fn.now());
t.timestamp('updated_at').nullable();
    
  });

  await knex('users').insert({
    username: 'manager',
    password: 'manager123',
    role: 'Manager',
    active: true
  });
};

module.exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('leave_records');
  await knex.schema.dropTableIfExists('salary_history');
  await knex.schema.dropTableIfExists('employees');
  await knex.schema.dropTableIfExists('users');
};
