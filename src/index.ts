import express, { Response, Request, NextFunction } from "express";
import 'express-async-errors';

import dotenv from 'dotenv';

dotenv.config();

import { errorMiddleware } from "./app/middlewares/error";
import { routes } from './app/routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running at http://localhos:${PORT}`));
