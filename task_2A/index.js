import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  let resultA = (typeof a !== 'undefined')?parseFloat(a):0;
  let resultB = (typeof b !== 'undefined')?parseFloat(b):0;
  resultA = resultA?resultA:0;
  resultB = resultB?resultB:0;
  const result = resultA + resultB;
  console.log("Вывод:" + result);
  return res.json({
  	Вывод: result,
  });
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
