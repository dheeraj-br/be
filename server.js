import express from 'express';
import authRoute from './routes/auth.js';

const app = express();

app.use('/api', authRoute);

app.listen(8080, () => {
  console.log('running on port 8080');
});
