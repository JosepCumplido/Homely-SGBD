import express from 'express';
import { ConnectionPool } from 'mssql';
import config from '../src/config/dbConfig';  // Configuración de la base de datos

const router = express.Router();

// Crear la conexión a la base de datos
const db = new ConnectionPool(config);

db.connect().then(() => {
  console.log('Connected to SQL Server');
}).catch((err: any) => {
  console.error('Database connection failed: ', err);
});

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});



module.exports = router;
