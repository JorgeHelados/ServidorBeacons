import express from "express";
import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = createPool({
  host: process.env.MYSQLDB_HOST,
  user: 'root',
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  port: process.env.MYSQLDB_DOCKER_PORT,
  database: process.env.MYSQLDB_DATABASE
});

// Coge la hora actual
app.get('/ping', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json(result[0]);
});

// Coge el utimo valor añadido de la columna Mediciones
app.get('/medicion', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT cantidad FROM Mediciones ORDER BY id DESC LIMIT 1');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sube el ultimo valor de la columna Mediciones
app.post('/medicion', async (req, res) => {
  try {
    const { cantidad } = req.body;
    if (cantidad === undefined) {
      return res.status(400).json({ error: 'El campo cantidad es requerido' });
    }

    const [result] = await pool.query('INSERT INTO Mediciones (cantidad) VALUES (?)', [cantidad]);
    res.json({ id: result.insertId, cantidad });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log('Server on port', process.env.NODE_DOCKER_PORT);
});
