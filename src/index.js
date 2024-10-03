import express from "express";
import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';
import cors from 'cors'; // Importa el paquete cors

config();

const app = express();

app.use(cors()); // Usa el middleware cors

const pool = createPool({
  host: process.env.MYSQLDB_HOST,
  user: 'root',
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  port: process.env.MYSQLDB_DOCKER_PORT,
  database: process.env.MYSQLDB_DATABASE
});

app.get('/ping', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json(result[0]);
});

// Nuevo endpoint para obtener el último valor de la columna 'cantidad'
app.get('/medicion', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT cantidad FROM Mediciones ORDER BY id DESC LIMIT 1');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log('Server on port', process.env.NODE_DOCKER_PORT);
});
