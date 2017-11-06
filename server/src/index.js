import express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/reports', (req, res) => {
  res.json([]);
});

app.put('/reports', (req, res) => {
  res.status(201).end();
});

app.listen(3000);
