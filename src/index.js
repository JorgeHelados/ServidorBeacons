import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import apiRoutes from './api.js';

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log('Server on port', process.env.NODE_DOCKER_PORT);
});
