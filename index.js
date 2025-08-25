import app from '../backend/app.js';
// import { config } from './config/env.js';
import { config } from '../backend/src/config/env.js';
import { db } from '../backend/src/db/knex.js';

// Ensure DB is migrated before starting
db.migrate.latest({ directory: './migrations' })
  .then(() => db.seed.run({ directory: './seeds' }))
  .then(() => {
    app.listen(config.port, () => {
      console.log(`✅ Server running on http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Boot failed:', err);
    process.exit(1);
  });
