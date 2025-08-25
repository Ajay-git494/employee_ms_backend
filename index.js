// import app from '../backend/app.js';
// // import { config } from './config/env.js';
// import { config } from '../backend/src/config/env.js';
// import { db } from '../backend/src/db/knex.js';

// // Ensure DB is migrated before starting
// db.migrate.latest({ directory: './migrations' })
//   .then(() => db.seed.run({ directory: './seeds' }))
//   .then(() => {
//     app.listen(config.port, () => {
//       console.log(`✅ Server running on http://localhost:${config.port}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ Boot failed:', err);
//     process.exit(1);
//   });


import app from './app.js';
import { db } from './src/db/knex.js';
import { config } from './src/config/env.js';

// Run migrations and seeds
(async () => {
  try {
    await db.migrate.latest({ directory: './migrations' });
    await db.seed.run({ directory: './seeds' });
    console.log('✅ Database migrated and seeded');
  } catch (err) {
    console.error('❌ DB migration/seed failed:', err);
    process.exit(1);
  }
})();

// Start server (for local development)
app.listen(config.port, () => {
  console.log(`✅ Server running on http://localhost:${config.port}`);
});

// Export app for serverless platforms (like Vercel)
export default app;
