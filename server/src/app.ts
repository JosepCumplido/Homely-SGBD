import express from 'express'
import { ConnectionPool } from 'mssql'
import { userRoutes } from './user/UserRoutes'
import config from './config/dbConfig'
import {homeRoutes} from "./home/HomeRoutes";
import {Client} from "@elastic/elasticsearch";
import cors from 'cors';

const app = express();
const port = 4000;

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permetre connexions del client
}));

app.use(express.json());

const db = new ConnectionPool(config);
const client = new Client({node: 'http://localhost:9200'});

db.connect().then(() => {
    console.log('Connected to SQL Server');

    // Afegeix les rutes de l'usuari
    app.use('/user', userRoutes(db));
    app.use('/home', homeRoutes(db, client));

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

}).catch((err: any) => {
    console.error('Database connection failed: ', err);
});