// import express from 'express';
// import helmet from 'helmet';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import morgan from 'morgan';

// import { notFound, errorHandler } from '../backend/src/middleware/errors.js';
// import authRoutes from '../backend/src/routes/auth.routes.js';
// import employeeRoutes from '../backend/src/routes/employees.routes.js';
// import leaveRoutes from '../backend/src/routes/leaves.routes.js';
// import salaryRoutes from '../backend/src/routes/salaries.routes.js';

// const app = express();

// app.use(helmet());
// app.use(cors({ origin: true, credentials: true }));
// app.use(morgan('dev'));
// app.use(express.json({ limit: '1mb' }));
// app.use(cookieParser());

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/employees', employeeRoutes);
// app.use('/api/leaves', leaveRoutes);
// app.use('/api/salaries', salaryRoutes);

// // 404 + error handler
// app.use(notFound);
// app.use(errorHandler);

// export default app;
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { notFound, errorHandler } from '../backend/src/middleware/errors.js';
import authRoutes from '../backend/src/routes/auth.routes.js';
import employeeRoutes from '../backend/src/routes/employees.routes.js';
import leaveRoutes from '../backend/src/routes/leaves.routes.js';
import salaryRoutes from '../backend/src/routes/salaries.routes.js';

const app = express();

// ✅ Highlight Change: Setup allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173/',           // Local frontend
  'https://your-frontend.vercel.app' // Replace with your deployed frontend URL
];

// ✅ Highlight Change: Update CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow requests like Postman or curl
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/salaries', salaryRoutes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

export default app;
