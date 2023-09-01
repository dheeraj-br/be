import express from 'express';
import authRoute from './routes/auth.js';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
config();
const app = express();
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log('mongodb Error => ', err));

app.use(morgan('dev'));

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: 'http://localhost:3000' }));
}

app.use('/api', authRoute);

app.listen(PORT, () => {
  console.log('running on port', PORT);
});
