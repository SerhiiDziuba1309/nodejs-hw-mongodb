import express from 'express';
import cors from 'cors';
import contactsRouter from './routes/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/contacts', contactsRouter);

  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  });
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
      status,
      message: err.message || 'Something went wrong',
    });
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });
  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
