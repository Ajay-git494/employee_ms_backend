module.exports.up = async function (knex) {
  await knex.schema.alterTable('employees', (t) => {
    t.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
  });
};

module.exports.down = async function (knex) {
  await knex.schema.alterTable('employees', (t) => {
    t.dropColumn('user_id');
  });
};
