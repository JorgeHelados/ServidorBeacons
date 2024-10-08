import express from 'express';
import { pool } from './bbdd.js';

const router = express.Router();

// Coge la hora actual
router.get('/ping', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT NOW()');
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la hora actual' });
  }
});

// Coge el último valor añadido de la columna Mediciones
router.get('/medicion', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT cantidad FROM Mediciones ORDER BY id DESC LIMIT 1');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la medición' });
  }
});

// Sube el último valor de la columna Mediciones
router.post('/medicion', async (req, res) => {
  try {
    const { cantidad } = req.body;
    if (cantidad === undefined) {
      return res.status(400).json({ error: 'El campo cantidad es requerido' });
    }
    console.log("Voy a subir " + cantidad);
    
    const [result] = await pool.query('INSERT INTO Mediciones (cantidad) VALUES (?)', [cantidad]);
    res.json({ id: result.insertId, cantidad });
  } catch (err) {
    res.status(500).json({ error: 'Error al subir la medición' });
  }
});

export default router;
