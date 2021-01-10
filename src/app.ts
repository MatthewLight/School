import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'hi' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
