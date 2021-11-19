import express from "express";
import 'express-async-errors';
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

import { errorMiddleware } from "./app/middlewares/error";
import { routes } from './app/routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

export { app };
