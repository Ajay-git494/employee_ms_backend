import app from './app.js';
import { db } from './src/db/knex.js';
import { config } from './src/config/env.js';  

if (process.env.NODE_ENV !== 'production') {
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
}


const PORT = process.env.PORT || config.port || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;

