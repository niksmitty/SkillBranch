import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

import getInfo from './getInfo';
import getVolumes from './getVolumes';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Something went wrong...', err);
  });

const app = express();
app.use(cors());

app.get('/volumes', (req, res) => {
  res.send(getVolumes(pc.hdd));
});

app.get(/^\/(?:\/)?(.*?)(?:\/)?$/, (req, res) => {
  const answer = getInfo(pc, req.params[0]);
  if (answer == 'Not Found') {
    return res.status(404).send('Not Found');
  }
  res.send(answer);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});