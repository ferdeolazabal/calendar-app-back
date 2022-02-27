import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors';
import { authRouter } from './routes/auth.js';
import { dbConnection } from './database/config.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

dbConnection()
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/auth', authRouter );


app.listen( PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`.bgGreen.black);
});