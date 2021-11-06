import express from "express";
import dotenv from 'dotenv';

dotenv.config();

import './database';
import routers from './routes';

const app = express();

app.use(express.json());
app.use(routers);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running at http://localhos:${PORT}`));
