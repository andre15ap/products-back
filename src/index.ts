import express from "express";
import './database';
import routers from './routes';

const app = express();

app.use(express.json());
app.use(routers);

app.listen(3000, () => console.log('Server running at http://localhos:3000'));
