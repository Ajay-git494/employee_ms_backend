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

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
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
