import express from "express";
import { connectDatabase } from './database';
import routers from './routes';

const app = express();

app.use(express.json());
app.use(routers);

connectDatabase().then(() => console.log('db conected'));

app.listen(3000, () => console.log('Server running at http://localhos:3000'));
