import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors';
import { dbConnection } from './database/config.js';
import { authRouter } from './routes/auth.js';
import { eventRouter } from './routes/events.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

dbConnection()
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRouter );
app.use('/api/events', eventRouter );


app.listen( PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`.bgGreen.black);
});