import express from 'express';
import * as dotenv from 'dotenv';
import routes from './routes/routes';

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.get('/', (req, res) => {
  res.json({ msg: 'School project' });
});

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
