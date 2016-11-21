import express from 'express';
import cors from 'cors';
import rgbHex from 'rgb-hex';
import oneCol from 'onecolor';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  if (req.query.color == undefined) {
    return res.send('Invalid color');
  }
  let color = req.query.color.trim().toLowerCase().replace(/%20/g, " ");

  if (color.substring(0, 3) == 'hsl') {
    try {
      const part = color.substring(color.indexOf('(') + 1, color.indexOf(')') - color.indexOf('(') + 3);
      const parts = part.split(',');
      const elemsIsCorrect = parts.slice(1).map((elem) => {
        if (elem.indexOf('%')>-1) {
          return parseInt(elem.replace('%', ''))>=0 && parseInt(elem.replace('%', ''))<=100;  
        }
        else {
          throw err;
        }
      });
      if (elemsIsCorrect.indexOf(false)>=0) {
        return res.send('Invalid color'); 
      }
      color = oneCol(color).hex();
    }
    catch(err) {
      return res.send('Invalid color');
    }
  }

  if (color.substring(0, 3) == 'rgb') {
    try {
      color = rgbHex(color);
    }
    catch(err) {
      return res.send('Invalid color');
    }
  }

  color = color.replace('#', '');

  let result = color;
  if (!/^[0-9ABCDEFabcdef]*$/.test(color) || (color.length!=3 && color.length!=6)) {
    return res.send('Invalid color');
  }

  if (color.length == 3) {
    result = '';
    for (let i=0;i<color.length;i++) {
      result += color.charAt(i) + color.charAt(i);
    }
  }
  res.send('#' + result);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});