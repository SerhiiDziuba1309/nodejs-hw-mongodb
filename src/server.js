import express from 'express';
import cors from 'cors';
import contactsRouter from './routes/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from "./routes/auth.js"
import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
