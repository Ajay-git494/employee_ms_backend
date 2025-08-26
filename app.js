import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// import { notFound, errorHandler } from '../backend/src/middleware/errors.js';
// import authRoutes from '../backend/src/routes/auth.routes.js';
// import employeeRoutes from '../backend/src/routes/employees.routes.js';
// import leaveRoutes from '../backend/src/routes/leaves.routes.js';
// import salaryRoutes from '../backend/src/routes/salaries.routes.js';
import { notFound, errorHandler } from './src/middleware/errors.js';
import authRoutes from './src/routes/auth.routes.js';
import employeeRoutes from './src/routes/employees.routes.js';
import leaveRoutes from './src/routes/leaves.routes.js';
import salaryRoutes from './src/routes/salaries.routes.js';


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
// -------------------------------------------------------------------------------------------------------------
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

// // ✅ Highlight Change: Setup allowed origins for CORS
// const allowedOrigins = [
//   'http://localhost:5173',           // Local frontend
//   'https://your-frontend.vercel.app' // Replace with your deployed frontend URL
// ];

// // ✅ Highlight Change: Update CORS middleware
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // allow requests like Postman or curl
//     if (allowedOrigins.indexOf(origin) === -1) {
//       return callback(new Error('Not allowed by CORS'), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

// app.use(helmet());
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

// -----------------------------------------------------------------------------------------------------------------
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

// // ✅ Highlight Change: Setup allowed origins for CORS
// const allowedOrigins = [
//   'http://localhost:5173',           // Local frontend
//   'https://your-frontend.vercel.app' // Replace with your deployed frontend URL
// ];

// // ✅ Highlight Change: Update CORS middleware to handle preflight and credentials
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // allow requests from tools like Postman
//     if (allowedOrigins.indexOf(origin) === -1) {
//       return callback(new Error('Not allowed by CORS'), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ✅ allow preflight methods
//   allowedHeaders: ['Content-Type', 'Authorization'],    // ✅ allow these headers
//   credentials: true                                     // ✅ allow cookies
// };

// app.use(cors(corsOptions));

// // ✅ Highlight Change: Handle OPTIONS requests globally (preflight)
// app.options('*', cors(corsOptions));

// app.use(helmet());
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

// // Allowed origins
// const allowedOrigins = [
//   'http://localhost:5173',           // Local frontend
//   'https://your-frontend.vercel.app' // Replace with your deployed frontend URL
// ];

// // ✅ CORS options for JWT
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // allow Postman or server-to-server requests
//     if (allowedOrigins.indexOf(origin) === -1) {
//       return callback(new Error('Not allowed by CORS'), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'], // allow preflight methods
//   allowedHeaders: ['Content-Type','Authorization'], // allow Authorization header for JWT
//   credentials: true // allow cookies (optional if using cookies)
// };

// // Handle preflight requests
// app.options('*', cors(corsOptions));
// app.use(cors(corsOptions));

// app.use(helmet());
// app.use(morgan('dev'));
// app.use(express.json({ limit: '1mb' }));
// app.use(cookieParser());

// // ✅ API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/employees', employeeRoutes);
// app.use('/api/leaves', leaveRoutes);
// app.use('/api/salaries', salaryRoutes);

// // ✅ Error handling
// app.use(notFound);
// app.use(errorHandler);

// export default app;







// import express from 'express';
// import helmet from 'helmet';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import morgan from 'morgan';

// // import { notFound, errorHandler } from './src/middleware/errors.js';
// import { notFound, errorHandler } from '../backend/src/middleware/errors.js';
// // import authRoutes from './src/routes/auth.routes.js';
// import authRoutes from '../backend/src/routes/auth.routes.js';
// // import employeeRoutes from './src/routes/employees.routes.js';
// // import leaveRoutes from './src/routes/leaves.routes.js';
// // import salaryRoutes from './src/routes/salaries.routes.js';

// const app = express();

// // ✅ Highlight Change: Allowed origins for frontend requests
// const allowedOrigins = [
//   'http://localhost:5173',           // Local frontend
// //   'https://your-frontend.vercel.app' // Replace with your deployed frontend URL
// ];

// // ✅ Highlight Change: Updated CORS middleware for JWT and preflight handling
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // allow Postman or server-to-server requests
//     if (allowedOrigins.indexOf(origin) === -1) {
//       return callback(new Error('Not allowed by CORS'), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'], // allow preflight methods
//   allowedHeaders: ['Content-Type','Authorization'], // allow Authorization header for JWT
//   credentials: true // allow cookies (optional if using cookies)
// };

// // ✅ Highlight Change: Handle preflight requests globally
// app.options('*', cors(corsOptions));
// app.use(cors(corsOptions));

// app.use(helmet());
// app.use(morgan('dev'));
// app.use(express.json({ limit: '1mb' }));
// app.use(cookieParser());

// // ✅ Highlight Change: Use routes as usual
// app.use('/api/auth', authRoutes);
// // app.use('/api/employees', employeeRoutes);
// // app.use('/api/leaves', leaveRoutes);
// // app.use('/api/salaries', salaryRoutes);

// // ✅ Highlight Change: Error handling for Vercel serverless functions
// app.use(notFound);
// app.use(errorHandler);

// // ✅ Highlight Change: Export app without app.listen() for serverless platforms like Vercel
// export default app;
