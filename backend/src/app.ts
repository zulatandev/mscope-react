import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import router from './routes';
import { connect } from './typeorm';

connect().then(() => {
  console.log('DB is connected!');
});

const app = express();

app.disable('etag');
app.disable('x-powered-by');

app.use(helmet());

app.use(cors());

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/api', router);
app.use('*', (req, res) => {
  console.log('ROUTE NOT FOUND');
  res.sendStatus(400);
});
export default app;
