import express from 'express';

const app = express();

app.get('', (req, res) => {
  res.json({ d: 4 });
});

app.listen(8080, () => {
  console.log('running on port 8080');
});
