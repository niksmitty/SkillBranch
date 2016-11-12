import express from 'express';
import cors from 'cors';

import canonize from './canonize.js';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  console.log(req.query.username);
  const url = canonize(req.query.username);
  res.send(url);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
