import express from 'express'
import { ConnectionPool } from 'mssql'
import { userRoutes } from './user/UserRoutes'
import config from './config/dbConfig'

const app = express();
const port = 4000;

app.use(express.json());

const db = new ConnectionPool(config);

db.connect().then(() => {
    console.log('Connected to SQL Server');

    // Afegeix les rutes de l'usuari
    app.use('/', userRoutes(db));

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err: any) => {
    console.error('Database connection failed: ', err);
});