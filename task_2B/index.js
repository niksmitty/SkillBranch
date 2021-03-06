import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  const text = req.query.fullname;
  const arr = text.toUpperCase().trim().split(/\s+/);
  const elemsIsCorrect = arr.map((elem) => {
    return /([0-9]|_|\/)+/.test(elem);
  });
  if (arr.length>3 || !text || elemsIsCorrect.indexOf(true)>=0) {
    return res.send('Invalid fullname');
  }
  const surname = arr.pop();
  const short_initials = arr.map((elem) => {
    return elem.charAt(0)+'.';
  }).toString().replace(',', ' ');
  let result = surname.charAt(0) + surname.slice(1).toLowerCase() + ' ' + short_initials;
  result = result.replace(/\s$/, '');
  res.send(`${result}`);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});