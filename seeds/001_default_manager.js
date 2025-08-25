import bcrypt from 'bcrypt';

export async function seed(knex) {
  await knex('users').del();
  const passwordHash = await bcrypt.hash('manager123',10);

  await knex('users').insert([{
    username:'manager',
    password:passwordHash,
    role:'Manager',
    active:true

  }]);
  
}